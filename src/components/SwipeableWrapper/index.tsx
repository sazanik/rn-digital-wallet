import React, { PropsWithChildren, useContext } from 'react';
import Animated from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';
import { colors } from '../../constants/colors';
import { AppContext } from '../../../App';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { StyleSheet } from 'react-native';
import { IconButton } from '../Buttons/IconButton';
import { TrashSVG } from '../../assets/SVGs/TrashSVG';
import { Card } from '../../models/Card';

interface Props {
  currentItem: Card;
}

export const SwipeableWrapper = ({
  children,
  currentItem,
}: PropsWithChildren<Props>) => {
  const { dispatch } = useContext(AppContext);
  const deleteCardHandler = () => {
    dispatch({ type: ActionsTypes.DELETE_CARD, payload: currentItem.name });
  };

  const swipeRight = () => {
    return (
      <Animated.View style={styles.root}>
        <IconButton onPress={deleteCardHandler}>
          <TrashSVG />
        </IconButton>
      </Animated.View>
    );
  };

  return (
    <Swipeable renderRightActions={swipeRight} rightThreshold={-100}>
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 300,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: -250,
    borderRadius: 20,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderColor: colors.lightGrey,
  },
});
