import { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import * as Linking from 'expo-linking';
import { ShofyouWebView } from '@/components/ShofyouWebView';
import { OfflineScreen } from '@/components/OfflineScreen';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

const SHOFYOU_URL = 'https://shofyou.com';

export default function Index() {
  const { isConnected } = useNetworkStatus();
  const [currentUrl, setCurrentUrl] = useState(SHOFYOU_URL);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#ffffff');

    const handleDeepLink = (event: { url: string }) => {
      const { url } = event;
      if (url.includes('shofyou.com')) {
        setCurrentUrl(url);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url && url.includes('shofyou.com')) {
        setCurrentUrl(url);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
  };

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <OfflineScreen onRetry={handleRetry} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <ShofyouWebView key={retryKey} url={currentUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.length : 0,
  },
});
