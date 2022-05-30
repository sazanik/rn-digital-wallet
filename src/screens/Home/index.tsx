import React, { useContext, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { commonStyles } from '../../constants/commonStyles';
import { TransactionModal } from '../../components/Modals/TransactionModal';
import { Transaction as TransactionProps } from '../../models/Transaction';
import { Transaction } from '../../components/Transaction';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { EmptyCard } from '../../components/Cards/EmptyCard';
import { ModalTypes } from '../../constants/ModalTypes';
import { Card } from '../../components/Cards';
import { CardModal } from '../../components/Modals/CardModal';
import { AppContext } from '../../../App';
import { NoTransactionsSVG } from '../../assets/SVGs/NoTransactionsSVG';

const modalsMap = {
  [ModalTypes.TRANSACTION]: TransactionModal,
  [ModalTypes.CARD]: CardModal,
  [ModalTypes.DEFAULT]: () => null,
};

export const Home = (): JSX.Element => {
  const { state, dispatch } = useContext(AppContext);

  const CustomModal = modalsMap[state.activeModal || ModalTypes.DEFAULT];

  const renderTransaction = ({ item }: { item: TransactionProps }) => (
    <Transaction {...item} />
  );

  useEffect(() => {
    const namesCardsArray = Object.keys(state.cards);

    if (namesCardsArray.length === 1) {
      dispatch({
        type: ActionsTypes.SET_ACTIVE_CARD,
        payload: namesCardsArray[0],
      });
    }
  }, [dispatch, state.cards]);

  return (
    <SafeAreaView style={commonStyles.root}>
      {state.activeModal && <CustomModal visible={true} />}

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
            renderItem={({ item }) => <Card currentCard={item} />}
            keyExtractor={item => item?.name || 'default'}
            extraData={state.activeCard}
            ListEmptyComponent={EmptyCard}
          />
        </View>
        {state.activeCard && (
          <View style={styles.horizontalWrapper}>
            {state.cards[state.activeCard].transactions?.length && (
              <Text style={styles.subtitle}>Last transactions</Text>
            )}
            <FlatList
              data={state.cards[state.activeCard]?.transactions}
              renderItem={renderTransaction}
              keyExtractor={item => String(item.amount) + item.comment}
              ListEmptyComponent={() => (
                <View style={styles.emptyWrapper}>
                  <NoTransactionsSVG />
                  <Text style={styles.emptyText}>
                    No transaction in your history yet
                  </Text>
                </View>
              )}
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
  emptyWrapper: {
    marginTop: '30%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  emptyText: {
    width: 230,
    marginTop: 30,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.warmGrey,
  },
  cards: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});
