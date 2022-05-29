import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { AddSVG } from '../../assets/SVGs/AddSVG';
import { IconButton } from '../Buttons/IconButton';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { ModalTypes } from '../../constants/ModalTypes';

interface Props {
  dispatch: React.Dispatch<{ type: ActionsTypes; payload: ModalTypes }>;
}

export const EmptyCard = ({ dispatch }: Props) => {
  const handlePress = () => {
    dispatch({ type: ActionsTypes.SHOW_MODAL, payload: ModalTypes.CARD });
  };

  return (
    <View style={styles.root}>
      <IconButton onPress={handlePress}>
        <AddSVG />
      </IconButton>
      <Text style={styles.title}>ADD NEW CARD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 330,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: colors.white,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 26,
  },
});
