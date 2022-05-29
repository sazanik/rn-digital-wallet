import React, { useCallback, useEffect, useReducer } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../constants/colors';
import { commonStyles } from '../../constants/commonStyles';
import { TransactionModal } from '../../components/Modals/TransactionModal';
import { Transaction as TransactionProps } from '../../models/Transaction';
import { Transaction } from '../../components/Transaction';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { State } from '../../models/State';
import { EmptyCard } from '../../components/Cards/EmptyCard';
import { ModalTypes } from '../../constants/ModalTypes';
import { Card as CardProps } from '../../models/Card';
import { Card } from '../../components/Cards';
import { CardModal } from '../../components/Modals/CardModal';

const initialState: State = {
  activeModal: null,
  activeCard: null,
  cards: {},
};

const reducer = (
  state: State,
  action: { type: ActionsTypes; payload: any },
): State => {
  switch (action.type) {
    case ActionsTypes.SHOW_MODAL:
      return {
        ...state,
        activeModal: action.payload as ModalTypes,
      };

    case ActionsTypes.HIDE_MODAL:
      return {
        ...state,
        activeModal: null,
      };

    case ActionsTypes.ADD_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.name]: action.payload,
        },
      };

    case ActionsTypes.ADD_TRANSACTION: {
      if (!state.activeCard) {
        return state;
      }

      return {
        ...state,
        cards: {
          ...state.cards,
          [state.activeCard]: {
            ...state.cards[state.activeCard],
            transactions: [
              ...(state.cards[state.activeCard].transactions || []),
              action.payload,
            ],
          },
        },
      };
    }

    case ActionsTypes.UPDATE_BALANCE: {
      if (!state.activeCard) {
        return state;
      }

      return {
        ...state,
        cards: {
          ...state.cards,
          [state.activeCard]: {
            ...state.cards[state.activeCard],
            balance: action.payload,
          },
        },
      };
    }

    case ActionsTypes.SET_ACTIVE_CARD:
      return {
        ...state,
        activeCard: action.payload,
      };

    default:
      return state;
  }
};

export const Home = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const modalsMap = {
    [ModalTypes.TRANSACTION]: TransactionModal,
    [ModalTypes.CARD]: CardModal,
    [ModalTypes.DEFAULT]: () => null,
  };

  const CustomModal = modalsMap[state.activeModal || ModalTypes.DEFAULT];

  const handleLongPressCard = useCallback(nameCard => {
    dispatch({ type: ActionsTypes.SET_ACTIVE_CARD, payload: nameCard });
  }, []);

  const handlePressEmptyCard = () => {
    dispatch({ type: ActionsTypes.SHOW_MODAL, payload: ModalTypes.CARD });
  };

  const renderCard = ({ item }: { item: CardProps }) => (
    <Pressable
      onLongPress={() => handleLongPressCard(item.name)}
      style={({ pressed }) => pressed && styles.hoverCard}>
      <Card state={state} dispatch={dispatch} currentCard={item} />
    </Pressable>
  );

  const renderTransaction = ({ item }: { item: TransactionProps }) => (
    <Transaction type={item.type} amount={item.amount} comment={item.comment} />
  );

  useEffect(() => {
    const namesCardsArray = Object.keys(state.cards);

    if (namesCardsArray.length === 1) {
      dispatch({
        type: ActionsTypes.SET_ACTIVE_CARD,
        payload: namesCardsArray[0],
      });
    }
  }, [state.cards]);

  return (
    <SafeAreaView style={commonStyles.root}>
      {state.activeModal && (
        <CustomModal visible={true} dispatch={dispatch} state={state} />
      )}

      <View style={styles.container}>
        <View style={styles.horizontalWrapper}>
          <Text style={styles.title}>Home</Text>
        </View>
        <View style={styles.cardsWrapper}>
          <FlatList
            contentContainerStyle={[
              styles.cards,
              Object.keys(state.cards).length < 2 && styles.fullWidth,
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Object.values(state.cards) || []}
            renderItem={renderCard}
            keyExtractor={item => item?.name || 'default'}
            extraData={state.activeCard}
            ListEmptyComponent={() => (
              <Pressable
                onPress={handlePressEmptyCard}
                style={({ pressed }) => ({ opacity: pressed ? 1 : 0.75 })}>
                <EmptyCard />
              </Pressable>
            )}
          />
        </View>
        {state.activeCard &&
          state.cards[state.activeCard].transactions?.length && (
            <View style={styles.horizontalWrapper}>
              <Text style={styles.subtitle}>Last transactions</Text>
              <FlatList
                data={state.cards[state.activeCard]?.transactions}
                renderItem={renderTransaction}
                keyExtractor={item => String(item.amount) + item.comment}
              />
            </View>
          )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // alignItems: 'center',
    marginTop: 20,
  },
  horizontalWrapper: {
    paddingHorizontal: '5%',
  },
  title: {
    width: '100%',
    color: colors.black,
    fontWeight: '700',
    fontSize: 30,
  },
  subtitle: {
    width: '100%',
    marginBottom: 4,
    color: colors.black,
    fontWeight: '600',
    fontSize: 18,
  },

  cardsWrapper: {
    width: '100%',
    height: '35%',
    alignItems: 'center',
  },

  cards: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  fullWidth: {
    width: '100%',
  },

  hoverCard: {
    marginTop: 4,
    opacity: 0.8,
  },
});
