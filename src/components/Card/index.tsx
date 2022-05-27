import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';

interface Props {
  name: string;
  initialBalance?: number;
}

export const Card = ({ name, initialBalance = 0 }: Props) => {
  return (
    <LinearGradient
      style={styles.root}
      colors={[colors.darkBlueGradient, colors.lightBlueGradient]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View />
      <View />
      <View />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 330,
    height: 200,
    padding: 25,
    borderRadius: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  name: {
    color: colors.while,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
});
