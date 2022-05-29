import React, { useCallback, useEffect, useReducer } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
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
import { isEmptyObject } from '../../utils/IsEmptyObject';

const initialState: State = {
  activeModal: null,
  activeCard: 'Default',
  cards: {
    Default: {
      name: 'Default',
      balance: 0,
      transactions: [],
    },
    Mtbank: {
      name: 'Mtbank',
      balance: 1000,
      transactions: [],
    },
  },
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
      return state;

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
    [ModalTypes.CARD]: TransactionModal,
    [ModalTypes.DEFAULT]: () => null,
  };

  const CustomModal = modalsMap[state.activeModal || ModalTypes.DEFAULT];

  const handlerOpenModalTransaction = useCallback(() => {
    dispatch({
      type: ActionsTypes.SHOW_MODAL,
      payload: ModalTypes.TRANSACTION,
    });
  }, []);

  const renderCard = ({ item }: { item: CardProps }) => (
    <Card
      currentCard={item}
      onOpenModalTransaction={handlerOpenModalTransaction}
    />
  );

  const renderTransaction = ({ item }: { item: TransactionProps }) => (
    <Transaction type={item.type} amount={item.amount} comment={item.comment} />
  );

  useEffect(() => {
    if (isEmptyObject(state.cards)) {
      return;
    }
    const firstCard = Object.keys(state.cards)[0];
    dispatch({ type: ActionsTypes.SET_ACTIVE_CARD, payload: firstCard });
  }, []);

  return (
    <View style={commonStyles.root}>
      {state.activeCard && (
        <CustomModal visible={true} dispatch={dispatch} state={state} />
      )}

      <View style={styles.container}>
        <View style={styles.horizontalWrapper}>
          <Text style={styles.title}>Home</Text>
        </View>
        <View style={styles.cards}>
          {state.activeCard ? (
            <FlatList
              horizontal
              data={Object.values(state.cards)}
              renderItem={renderCard}
              keyExtractor={item => item.name?.toString() || 'default'}
            />
          ) : (
            <EmptyCard dispatch={dispatch} />
          )}
        </View>
        {state.activeCard && (
          <View style={styles.horizontalWrapper}>
            <Text style={styles.subtitle}>Last transactions</Text>
            <FlatList
              data={state.cards[state.activeCard].transactions}
              renderItem={renderTransaction}
              keyExtractor={item => String(item.amount) + item.comment}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  horizontalWrapper: {
    paddingHorizontal: '5%',
  },
  title: {
    marginBottom: 28,
    color: colors.black,
    fontWeight: '700',
    fontSize: 30,
  },
  subtitle: {
    marginBottom: 16,
    color: colors.black,
    fontWeight: '600',
    fontSize: 18,
  },
  cards: {
    alignItems: 'center',
    height: '35%',
  },
});
