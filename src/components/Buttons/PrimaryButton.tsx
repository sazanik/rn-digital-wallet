import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';

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
      style={({ pressed }) => pressed && { opacity: 0.8 }}>
      <LinearGradient
        style={styles.button}
        colors={
          disabled
            ? [colors.lightGrey, colors.lightGrey]
            : [colors.darkBlueGradient, colors.lightBlueGradient]
        }
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: '100%',
    borderRadius: 35,
  },
  title: {
    fontSize: 16,
    color: colors.buttonText,
    fontWeight: '600',
  },
});
