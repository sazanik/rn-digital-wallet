import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { commonStyles } from '../../constants/commonStyles';
import { colors } from '../../constants/colors';

export const Loader = () => (
  <SafeAreaView style={commonStyles.root}>
    <Text style={styles.text}>Please wait...</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: colors.black,
  },
});
