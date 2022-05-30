import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../../constants/colors';
import { AddSVG } from '../../assets/SVGs/AddSVG';
import { AppContext } from '../../../App';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { ModalTypes } from '../../constants/ModalTypes';

export const EmptyCard = () => {
  const { dispatch } = useContext(AppContext);

  const handlePress = () => {
    dispatch({ type: ActionsTypes.SHOW_MODAL, payload: ModalTypes.CARD });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) =>
        pressed ? [styles.root, styles.hover] : styles.root
      }>
      <AddSVG />
      <Text style={styles.title}>ADD NEW CARD</Text>
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
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.warmGrey,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 1,
    },
    elevation: 5,
    opacity: 0.8,
  },
  title: {
    marginTop: 10,
    color: colors.white,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 26,
  },

  hover: {
    opacity: 1,
  },
});
