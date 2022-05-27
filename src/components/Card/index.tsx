import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';
import { AddSVG } from '../../assets/SVGs/Add';

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
        <Text style={[styles.text, styles.name]}>{name}</Text>
        <AddSVG />
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.balance]}>
          {`$ ${initialBalance}`}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.number]}>12** **** **** 3456</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.expireDate]}>01/23</Text>
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: colors.white,
  },
  name: {
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
  },
  balance: {
    marginBottom: 36,
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 40,
  },
  number: {
    marginBottom: 4,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  expireDate: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
  },
});
