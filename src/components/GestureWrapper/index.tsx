import React, { PropsWithChildren } from 'react';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { useFollowAnimatedPosition } from '../../hooks/useFollowAnimatedPosition';

interface Props {
  innerElementWidth: number;
}

export const GestureWrapper = ({
  children,
  innerElementWidth,
}: PropsWithChildren<Props>) => {
  const translateX = useSharedValue(0);
  const context = useSharedValue({ x: 0 });

  const { width: SCREEN_WIDTH } = Dimensions.get('screen');

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value };
    })
    .onUpdate(event => {
      translateX.value = event.translationX + context.value.x;
    })
    .onEnd(() => {
      if (translateX.value < -SCREEN_WIDTH / 4) {
        translateX.value = innerElementWidth - SCREEN_WIDTH;
      } else {
        translateX.value = 0;
      }
    });

  const { rStyle } = useFollowAnimatedPosition({ x: translateX });

  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View style={rStyle}>{children}</Animated.View>
      </GestureDetector>
    </>
  );
};
