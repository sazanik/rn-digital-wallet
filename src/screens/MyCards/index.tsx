import React, { useContext } from 'react';
import { ScreenLayout } from '../../components/Layouts/ScreenLayout';
import { FlatList, StyleSheet, View } from 'react-native';
import { AppContext } from '../../../App';
import { Card } from '../../components/Cards';
import { IconButton } from '../../components/Buttons/IconButton';
import { AddSVG } from '../../assets/SVGs/AddSVG';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { ModalTypes } from '../../constants/ModalTypes';
import { colors } from '../../constants/colors';

export const MyCards = () => {
  const { state, dispatch } = useContext(AppContext);

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
        contentContainerStyle={styles.cards}
        data={Object.values(state.cards) || []}
        renderItem={({ item }) => (
          <View style={styles.wrapper}>
            <Card currentCard={item} />
          </View>
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
    marginTop: 10,
    marginHorizontal: 20,
  },
  wrapper: {
    marginTop: 10,
  },
});
