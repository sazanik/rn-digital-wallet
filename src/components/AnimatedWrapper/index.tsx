import React, { PropsWithChildren, ReactNode, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const AnimatedWrapper = ({ children }: PropsWithChildren<ReactNode>) => {
  const animationFade = useRef(new Animated.Value(0)).current;

  useFocusEffect(() => {
    Animated.timing(animationFade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(animationFade, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
  });

  return (
    <Animated.View style={[styles.root, { opacity: animationFade }]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
