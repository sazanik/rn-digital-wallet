import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { IconButton } from '../Buttons/IconButton';
import { TrashSVG } from '../../assets/SVGs/TrashSVG';
import { Card as CardProps } from '../../models/Card';
import { AppContext } from '../../../App';
import { ActionsTypes } from '../../constants/ActionsTypes';

interface Props {
  currentCard: CardProps;
}

export const CardBackground = ({ currentCard }: Props) => {
  const { dispatch } = useContext(AppContext);

  const deleteCardHandler = () => {
    dispatch({ type: ActionsTypes.DELETE_CARD, payload: currentCard.name });
  };

  return (
    <View style={styles.root}>
      <IconButton onPress={deleteCardHandler}>
        <TrashSVG />
      </IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 200,
    height: 200,
    marginTop: 10,
    marginLeft: 100,
    paddingRight: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderLeftWidth: 0,

    borderColor: colors.lightGrey,
  },
});
