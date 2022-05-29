import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { AddSVG } from '../../assets/SVGs/AddSVG';

export const EmptyCard = () => (
  <View style={styles.root}>
    <AddSVG />
    <Text style={styles.title}>ADD NEW CARD</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 200,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.grey,
    shadowColor: colors.black,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: {
      width: 4,
      height: 3,
    },
    elevation: 30,
  },
  title: {
    marginTop: 10,
    color: colors.white,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 26,
  },
});
