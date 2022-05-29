import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';
import { AddSVG } from '../../assets/SVGs/AddSVG';
import { VisaSVG } from '../../assets/SVGs/VisaSVG';
import { commonStyles } from '../../constants/commonStyles';
import { IconButton } from '../Buttons/IconButton';
import { Card as CardProps } from '../../models/Card';

interface Props {
  onOpenModalTransaction: () => void;
  currentCard: CardProps;
}

export const Card = ({ currentCard, onOpenModalTransaction }: Props) => {
  const handlePress = () => {
    if (onOpenModalTransaction) {
      onOpenModalTransaction();
    }
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        style={styles.card}
        colors={[colors.darkBlueGradient, colors.lightBlueGradient]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}>
        <View style={styles.row}>
          <Text style={[styles.text, styles.name]}>{currentCard.name}</Text>
          <IconButton onPress={handlePress}>
            <AddSVG />
          </IconButton>
        </View>
        <View style={styles.row}>
          <Text
            style={[
              styles.text,
              styles.balance,
            ]}>{`$${currentCard.balance}`}</Text>
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
    elevation: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
  },
  row: {
    ...commonStyles.row,
    justifyContent: 'space-between',
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
});
