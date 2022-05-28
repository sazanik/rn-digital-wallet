import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';

interface Props {
  children: ReactNode;
}

export const PrimaryButton = ({ children }: Props) => {
  return (
    <LinearGradient
      style={styles.button}
      colors={[colors.darkBlueGradient, colors.lightBlueGradient]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}>
      <Text style={styles.title}>{children}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
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
