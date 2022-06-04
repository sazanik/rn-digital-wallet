import React, { useContext } from 'react';
import { ScreenLayout } from '../../components/Layouts/ScreenLayout';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Card } from '../../components/Cards';
import { IconButton } from '../../components/Buttons/IconButton';
import { AddSVG } from '../../assets/SVGs/AddSVG';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { ModalTypes } from '../../constants/ModalTypes';
import { colors } from '../../constants/colors';
import { SwipeableWrapper } from '../../components/SwipeableWrapper';
import { AppContext } from '../../modules/context';

export const MyCards = () => {
  const { state, dispatch } = useContext(AppContext);
  const { width } = useWindowDimensions();

  const addCardHandler = () => {
    dispatch({ type: ActionsTypes.SHOW_MODAL, payload: ModalTypes.CARD });
  };

  const RightHeaderComponent = (
    <IconButton onPress={addCardHandler}>
      <AddSVG fill={colors.black} />
    </IconButton>
  );

  return (
    <ScreenLayout rightHeaderComponent={RightHeaderComponent} title="MyCards">
      <FlatList
        contentContainerStyle={[styles.cards, { width }]}
        data={Object.values(state?.cards || [])}
        renderItem={({ item }) => (
          <>
            <SwipeableWrapper currentItem={item}>
              <View style={[styles.cardWrapper, { width }]}>
                <Card currentCard={item} />
              </View>
            </SwipeableWrapper>
          </>
        )}
        keyExtractor={item => item?.name || 'default'}
        extraData={state.activeCard}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  cards: {
    alignItems: 'center',
    minHeight: '100%',
    marginTop: 20,
  },

  cardWrapper: {
    marginVertical: 10,
    alignItems: 'center',
  },
});
