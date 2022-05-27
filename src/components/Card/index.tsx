import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';
import { AddSVG } from '../../assets/SVGs/AddSVG';
import { VisaSVG } from '../../assets/SVGs/VisaSVG';

interface Props {
  name: string;
  initialBalance?: number;
}

export const Card = ({ name, initialBalance = 0 }: Props) => {
  const handlePress = () => {
    console.log('handlePress');
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        style={styles.card}
        colors={[colors.darkBlueGradient, colors.lightBlueGradient]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}>
        <View style={styles.row}>
          <Text style={[styles.text, styles.name]}>{name}</Text>
          <Pressable
            hitSlop={{
              bottom: 20,
              left: 20,
              right: 20,
              top: 20,
            }}
            style={({ pressed }) => pressed && styles.pressedWrapper}
            onPress={handlePress}>
            <View style={styles.iconWrapper}>
              <AddSVG />
            </View>
          </Pressable>
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
          <VisaSVG />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 330,
    height: 200,
    shadowColor: colors.black,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: {
      width: 4,
      height: 3,
    },
    elevation: 12,
  },
  card: {
    borderRadius: 20,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
  },
  name: {
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
  },
  balance: {
    marginBottom: 20,
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 40,
  },
  number: {
    marginBottom: 4,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
  },
  expireDate: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  pressedWrapper: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: colors.transparentGrey,
  },
});
