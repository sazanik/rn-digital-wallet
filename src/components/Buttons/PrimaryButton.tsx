import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';
import { gradientColors } from '../../constants/gradientColors';

interface Props {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export const PrimaryButton = ({ title, onPress, disabled }: Props) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) =>
        pressed ? [styles.pressable, { opacity: 0.8 }] : styles.pressable
      }>
      <LinearGradient
        style={styles.innerPressable}
        colors={
          disabled
            ? [colors.warmGrey, colors.warmGrey]
            : [
                gradientColors.darkBlueGradient,
                gradientColors.lightBlueGradient,
              ]
        }
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    height: 50,
  },

  innerPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  title: {
    fontSize: 16,
    color: colors.buttonText,
    fontWeight: '600',
  },
});
