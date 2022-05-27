import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { Card } from '../../components/Card';

export const Home = (): JSX.Element => {
  return (
    <View style={styles.root}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Home</Text>
      </View>
      <View style={styles.cards}>
        <Card name="MTBank" />
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.subtitle}>Last transactions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
  },
  wrapper: {
    marginHorizontal: 24,
  },

  title: {
    marginBottom: 28,
    color: colors.black,
    fontWeight: '700',
    fontSize: 30,
  },
  subtitle: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 18,
  },

  cards: {
    alignItems: 'center',
    height: '35%',
  },
});
