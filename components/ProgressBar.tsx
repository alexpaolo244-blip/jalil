import { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface ProgressBarProps {
  progress: number;
  visible: boolean;
}

export function ProgressBar({ progress, visible }: ProgressBarProps) {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      Animated.timing(animatedWidth, {
        toValue: progress,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [progress, visible, animatedWidth, animatedOpacity]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: animatedOpacity }]}>
      <Animated.View
        style={[styles.progressBar, { width: widthInterpolated }]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2196F3',
  },
});
