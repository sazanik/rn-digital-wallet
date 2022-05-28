import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../../constants/colors';
import { Card } from '../../components/Card';
import { CrossSVG } from '../../assets/SVGs/CrossSVG';
import { commonStyles } from '../../constants/commonStyles';
import { PrimaryButton } from '../../components/PrimaryButton';

export const Home = (): JSX.Element => {
  const [isModalVisible, setModalVisible] = useState(true);

  const handleAddCard = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.root}>
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <View style={styles.modalRoot}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <View style={styles.crossRow}>
                <Pressable
                  hitSlop={{
                    bottom: 20,
                    left: 20,
                    right: 20,
                    top: 20,
                  }}
                  style={({ pressed }) =>
                    pressed && [
                      styles.iconWrapper,
                      { backgroundColor: colors.transparentGrey },
                    ]
                  }
                  onPress={handleCloseModal}>
                  <View style={styles.iconWrapper}>
                    <CrossSVG />
                  </View>
                </Pressable>
              </View>
              <View style={styles.textRow}>
                <Text style={styles.modalTitle}>New transaction</Text>
              </View>
            </View>
            <View style={styles.formRow}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                maxLength={7}
                placeholder="count $"
              />
              <TextInput
                style={styles.input}
                keyboardType="default"
                maxLength={70}
                placeholder="comment"
              />
            </View>
            <View style={styles.buttonRow}>
              <PrimaryButton>Add</PrimaryButton>
            </View>
          </View>
        </View>
      </Modal>
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
  root: commonStyles.root,
  modalRoot: {
    ...commonStyles.root,
    backgroundColor: colors.transparentDarkGrey,
  },
  modal: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    height: '50%',
    padding: '5%',
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  modalTitle: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.black,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    marginTop: 20,
  },
  row: commonStyles.row,
  modalHeader: {},
  crossRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  iconWrapper: {
    ...commonStyles.iconWrapper,
  },
  textRow: {},
  formRow: {
    width: '100%',
    height: 120,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.transparentGrey,
    fontSize: 16,
    fontWeight: '500',
  },
  buttonRow: {
    ...commonStyles.row,
    justifyContent: 'center',
    height: 50,
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
