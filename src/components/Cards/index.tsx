import React, { useContext } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';
import { AddSVG } from '../../assets/SVGs/AddSVG';
import { VisaSVG } from '../../assets/SVGs/VisaSVG';
import { commonStyles } from '../../constants/commonStyles';
import { IconButton } from '../Buttons/IconButton';
import { Card as CardProps } from '../../models/Card';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { ModalTypes } from '../../constants/ModalTypes';
import { AppContext } from '../../../App';

interface Props {
  currentCard: CardProps;
  advanced?: boolean;
}

export const Card = ({ currentCard, advanced }: Props) => {
  const { dispatch, state } = useContext(AppContext);

  const handlePress = () => {
    dispatch({
      type: ActionsTypes.SHOW_MODAL,
      payload: ModalTypes.TRANSACTION,
    });

    if (currentCard.name) {
      dispatch({
        type: ActionsTypes.SET_ACTIVE_CARD,
        payload: currentCard?.name,
      });
    }
  };

  const handleLongPressCard = () => {
    dispatch({
      type: ActionsTypes.SET_ACTIVE_CARD,
      payload: currentCard.name,
    });
  };

  // const gradientColors = getGradientColors();
  const isActive = currentCard.name === state.activeCard;

  return (
    <Pressable
      onLongPress={handleLongPressCard}
      style={({ pressed }) => [
        styles.root,
        { opacity: advanced ? 0.7 : 1 },
        advanced && isActive && styles.active,
        advanced && pressed && styles.hover,
      ]}>
      <LinearGradient
        style={[styles.card]}
        colors={currentCard.gradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}>
        <View style={styles.row}>
          <Text style={[styles.text, styles.name]}>{currentCard.name}</Text>
          {advanced && (
            <IconButton onPress={handlePress}>
              <AddSVG fill={colors.white} />
            </IconButton>
          )}
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 200,
    borderRadius: 20,
    borderWidth: 3,
    backgroundColor: colors.warmGrey,
    borderColor: 'transparent',
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 1,
    },
    elevation: 5,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  hover: {
    marginTop: 4,
  },
  active: {
    borderColor: colors.orange,
    opacity: 1,
  },
  card: {
    width: '100%',
    height: '100%',
    padding: 15,
    borderRadius: 17,
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
});
