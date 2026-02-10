import { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import * as ImagePicker from 'expo-image-picker';
import { ProgressBar } from './ProgressBar';

interface ShofyouWebViewProps {
  url: string;
}

export function ShofyouWebView({ url }: ShofyouWebViewProps) {
  const webViewRef = useRef<WebView>(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<any>(null);

  const handleNavigationStateChange = useCallback(
    async (navState: any) => {
      const { url: currentUrl } = navState;

      if (currentUrl && !currentUrl.includes('shofyou.com')) {
        webViewRef.current?.stopLoading();
        await WebBrowser.openBrowserAsync(currentUrl, {
          controlsColor: '#2196F3',
          toolbarColor: '#fff',
          dismissButtonStyle: 'close',
          readerMode: false,
        });
        return false;
      }
      return true;
    },
    []
  );

  const handleFileInput = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload files!');
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsMultipleSelection: true,
      quality: 1,
      videoMaxDuration: 300,
    });

    if (!result.canceled) {
      return result.assets;
    }
    return null;
  }, []);

  const injectedJavaScript = `
    (function() {
      const originalInputClick = HTMLInputElement.prototype.click;
      HTMLInputElement.prototype.click = function() {
        if (this.type === 'file') {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'FILE_INPUT_CLICK',
            accept: this.accept,
            multiple: this.multiple
          }));
          return;
        }
        originalInputClick.call(this);
      };

      document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.tagName === 'INPUT' && target.type === 'file') {
          e.preventDefault();
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'FILE_INPUT_CLICK',
            accept: target.accept,
            multiple: target.multiple
          }));
        }
      }, true);

      true;
    })();
  `;

  const handleMessage = useCallback(
    async (event: any) => {
      try {
        const data = JSON.parse(event.nativeEvent.data);

        if (data.type === 'FILE_INPUT_CLICK') {
          const assets = await handleFileInput();

          if (assets && assets.length > 0) {
            const fileData = assets.map((asset) => ({
              uri: asset.uri,
              type: asset.type,
              name: asset.fileName || 'upload',
            }));

            webViewRef.current?.injectJavaScript(`
              (function() {
                const event = new CustomEvent('fileSelected', {
                  detail: ${JSON.stringify(fileData)}
                });
                document.dispatchEvent(event);
              })();
              true;
            `);
          }
        }
      } catch (error) {
        console.error('Error handling message:', error);
      }
    },
    [handleFileInput]
  );

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} visible={isLoading} />
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        onLoadStart={() => {
          setIsLoading(true);
          setProgress(0.1);
        }}
        onLoadProgress={({ nativeEvent }) => {
          setProgress(nativeEvent.progress);
        }}
        onLoadEnd={() => {
          setIsLoading(false);
          setProgress(1);
        }}
        onShouldStartLoadWithRequest={(request) => {
          if (!request.url.includes('shofyou.com')) {
            handleNavigationStateChange({ url: request.url });
            return false;
          }
          return true;
        }}
        onMessage={handleMessage}
        injectedJavaScript={injectedJavaScript}
        pullToRefreshEnabled={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        cacheEnabled={true}
        cacheMode="LOAD_CACHE_ELSE_NETWORK"
        incognito={false}
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        allowsFullscreenVideo={true}
        {...(Platform.OS === 'android' && {
          androidLayerType: 'hardware',
          androidHardwareAccelerationDisabled: false,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
