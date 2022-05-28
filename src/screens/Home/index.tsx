import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { Card } from '../../components/Card';
import { commonStyles } from '../../constants/commonStyles';
import { PrimaryModal } from '../../components/Modals/PrimaryModal';
import { Transaction } from '../../components/Transaction';

interface Transactions {}

export const Home = (): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  console.log(transactions);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSaveTransaction = (transaction: Transactions) => {
    setTransactions(prevState => [...prevState, transaction]);
  };

  return (
    <View style={commonStyles.root}>
      <PrimaryModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSaveTransaction}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.cards}>
          <Card onPressAdd={handleOpenModal} name="MTBank" />
        </View>
        <Text style={styles.subtitle}>Last transactions</Text>
        <Transaction type="expense" amount="30.000" comment="Bought a car" />
        <Transaction type="income" amount="10.000" comment="Salary" />
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
