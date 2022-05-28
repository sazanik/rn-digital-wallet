import React, { useReducer, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { Card } from '../../components/Card';
import { commonStyles } from '../../constants/commonStyles';
import { PrimaryModal } from '../../components/Modals/PrimaryModal';
import { Transaction as TransactionProps } from '../../types/Transaction';
import { Transaction } from '../../components/Transaction';
import { ActionsTypes } from '../../types/ActionsTypes';
import { State } from '../../types/State';

const initialState: State = {
  cards: [],
  activeCard: {
    name: 'Default',
    balance: 0,
    transactions: [],
  },
};

const reducer = (
  state: State,
  action: { type: ActionsTypes; payload: any },
): State => {
  switch (action.type) {
    case ActionsTypes.ADD_NEW_CARD:
      return state;
    case ActionsTypes.ADD_TRANSACTION:
      return {
        ...state,
        activeCard: {
          ...state.activeCard,
          transactions: [
            ...(state.activeCard?.transactions || []),
            action.payload as TransactionProps,
          ],
        },
      };
    case ActionsTypes.UPDATE_BALANCE:
      return {
        ...state,
        activeCard: {
          ...state.activeCard,
          balance: action.payload,
        },
      };
    case ActionsTypes.SET_ACTIVE_CARD:
      return state;
    default:
      return state;
  }
};

export const Home = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const renderTransaction = ({ item }: { item: TransactionProps }) => (
    <Transaction type={item.type} amount={item.amount} comment={item.comment} />
  );

  return (
    <View style={commonStyles.root}>
      {state.activeCard && (
        <PrimaryModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          dispatch={dispatch}
          state={state}
        />
      )}

      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.cards}>
          {state.activeCard && (
            <Card onPressAdd={handleOpenModal} activeCard={state.activeCard} />
          )}
        </View>
        <Text style={styles.subtitle}>Last transactions</Text>
        <FlatList
          data={state.activeCard?.transactions}
          renderItem={renderTransaction}
          keyExtractor={item => String(item.amount) + item.comment}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginTop: 20,
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
