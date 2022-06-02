import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

interface AnimatedPosition {
  x: Animated.SharedValue<number>;
}

export const useFollowAnimatedPosition = ({ x }: AnimatedPosition) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: followX.value }],
  }));

  return { rStyle };
};
