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
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

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

  const translateX = useSharedValue(0);

  const context = useSharedValue({ x: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value };
    })
    .onUpdate(event => {
      translateX.value = event.translationX + context.value.x;
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <ScreenLayout rightHeaderComponent={RightHeaderComponent} title="MyCards">
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.test, rStyle]} />
      </GestureDetector>
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
  test: {
    width: 50,
    height: 40,
    backgroundColor: colors.red,
  },

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
