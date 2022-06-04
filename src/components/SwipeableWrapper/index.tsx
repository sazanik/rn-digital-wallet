import React, { PropsWithChildren, useContext } from 'react';
import Animated from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';
import { colors } from '../../constants/colors';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { IconButton } from '../Buttons/IconButton';
import { TrashSVG } from '../../assets/SVGs/TrashSVG';
import { Card } from '../../models/Card';
import { AppContext } from '../../modules/context';

interface Props {
  currentItem: Card;
}

export const SwipeableWrapper = ({
  children,
  currentItem,
}: PropsWithChildren<Props>) => {
  const { dispatch } = useContext(AppContext);
  const { width } = useWindowDimensions();
  const indent = (width - 300) / 2;
  const deleteCardHandler = () => {
    dispatch({ type: ActionsTypes.DELETE_CARD, payload: currentItem.name });
  };

  const swipeRight = () => {
    return (
      <Animated.View style={[styles.root, { marginRight: indent }]}>
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
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 300,
    height: 200,
    marginLeft: -240,
    paddingRight: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderColor: colors.lightGrey,
  },
});
