import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';
import { AddSVG } from '../../assets/SVGs/AddSVG';
import { VisaSVG } from '../../assets/SVGs/VisaSVG';
import { commonStyles } from '../../constants/commonStyles';
import { IconButton } from '../Buttons/IconButton';
import { Card as CardProps } from '../../models/Card';
import { State } from '../../models/State';

interface Props {
  onOpenModalTransaction: () => void;
  currentCard: CardProps;
  state: State;
}

export const Card = ({ currentCard, onOpenModalTransaction, state }: Props) => {
  const handlePress = () => {
    if (onOpenModalTransaction) {
      onOpenModalTransaction();
    }
  };

  const isActive = currentCard.name === state.activeCard;

  return (
    <View style={styles.root}>
      <LinearGradient
        style={[styles.card, isActive && styles.activeCard]}
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 200,
    marginHorizontal: 10,
    shadowColor: colors.black,
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      width: 4,
      height: 3,
    },
    elevation: 20,
  },
  card: {
    width: '95%',
    height: '95%',
    borderRadius: 20,
    padding: 15,
  },
  row: {
    ...commonStyles.row,
    justifyContent: 'space-between',
  },
  text: {
    color: colors.white,
  },
  name: {
    marginBottom: 4,
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

  chooseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 25,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 8,
  },

  textChooseButton: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },

  activeCard: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderColor: colors.orange,
  },
});
