import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

export default function AnimatedLabel({ label, focused }: { label: string; focused: boolean }) {
  const opacity = useRef(new Animated.Value(focused ? 1 : 0.5)).current;
  const scale = useRef(new Animated.Value(focused ? 1.2 : 1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: focused ? 1 : 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: focused ? 1.2 : 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.Text
      style={[
        styles.label,
        {
          opacity,
          transform: [{ scale }],
        },
      ]}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {label}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    maxWidth: 70,
  },
});
