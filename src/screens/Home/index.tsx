import React, { useContext, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { Transaction as TransactionProps } from '../../models/Transaction';
import { Transaction } from '../../components/Transaction';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { EmptyCard } from '../../components/Cards/EmptyCard';
import { Card } from '../../components/Cards';
import { NoTransactionsSVG } from '../../assets/SVGs/NoTransactionsSVG';
import { ScreenLayout } from '../../components/Layouts/ScreenLayout';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../modules/context';

export const Home = (): JSX.Element => {
  const navigation = useNavigation();
  const { state, dispatch } = useContext(AppContext);

  const renderTransaction = ({ item }: { item: TransactionProps }) => (
    <Transaction {...item} />
  );

  useEffect(() => {
    // @ts-ignore
    const unsubscribe = navigation.addListener('tabPress', e => {
      dispatch({
        type: ActionsTypes.SET_SCREEN,
        payload: e.target?.split('-')[0],
      });
    });

    return unsubscribe;
  }, [dispatch, navigation]);

  return (
    <ScreenLayout title="Home">
      <View style={styles.cardsWrapper}>
        <FlatList
          contentContainerStyle={[
            styles.cards,
            Object.keys(state?.cards || []).length < 2 && styles.fullWidth,
          ]}
          horizontal
          data={Object.values(state?.cards || [])}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <Card advanced currentCard={item} />
            </View>
          )}
          keyExtractor={item => item?.name || 'default'}
          extraData={state.activeCard}
          ListEmptyComponent={EmptyCard}
        />
      </View>
      {state.activeCard && (
        <View style={styles.horizontalWrapper}>
          {state.cards[state.activeCard]?.transactions?.length && (
            <Text style={styles.transactionSubtitle}>Last transactions</Text>
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
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  horizontalWrapper: {
    paddingHorizontal: '5%',
  },
  cardsWrapper: {
    alignItems: 'center',
    width: '100%',
    height: '35%',
    minHeight: 260,
    marginBottom: 20,
  },
  cardWrapper: {
    marginHorizontal: 10,
  },
  transactionSubtitle: {
    width: '100%',
    marginBottom: 15,
    color: colors.black,
    fontWeight: '600',
    fontSize: 18,
  },
  emptyWrapper: {
    marginTop: '30%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  emptyText: {
    width: 250,
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
