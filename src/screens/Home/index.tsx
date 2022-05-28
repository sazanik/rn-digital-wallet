import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { Card } from '../../components/Card';
import { commonStyles } from '../../constants/commonStyles';
import { PrimaryModal } from '../../components/Modals/PrimaryModal';

export const Home = (): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(true);

  const handleAddCard = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={commonStyles.root}>
      <PrimaryModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onDone={handleAddCard}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.cards}>
          <Card onAddCard={handleAddCard} name="MTBank" />
        </View>
        <Text style={styles.subtitle}>Last transactions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    marginBottom: 28,
    color: colors.black,
    fontWeight: '700',
    fontSize: 30,
  },
  subtitle: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 18,
  },
  cards: {
    alignItems: 'center',
    height: '35%',
  },
});
