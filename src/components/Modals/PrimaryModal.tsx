import React, { useCallback, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { IconButton } from '../Buttons/IconButton';
import { CrossSVG } from '../../assets/SVGs/CrossSVG';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { commonStyles } from '../../constants/commonStyles';
import { colors } from '../../constants/colors';
import { Toggle } from '../Toggle';
import { transactionsOptions } from '../Toggle/options';
import { ToggleIds } from '../../types/ToggleIds';
import { Transaction } from '../../types/Transaction';
import { Fields } from '../../types/Fields';
import { ActionsTypes } from '../../types/ActionsTypes';
import { State } from '../../types/State';
import { TransactionsTypes } from '../../types/TransactionsTypes';

interface Props {
  dispatch: React.Dispatch<{ type: ActionsTypes; payload: any }>;
  state: State;
  visible?: boolean;
  onClose: () => void;
}

export const PrimaryModal = ({ onClose, visible, state, dispatch }: Props) => {
  const [activeId, setActiveId] = useState<ToggleIds>(0);
  const [formData, setFormData] = useState<Transaction | null>(null);

  const handleToggle = (id: ToggleIds) => {
    setActiveId(id);
  };

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleChangeText = useCallback(
    (field: Fields, value: string) => {
      setFormData({
        amount: '',
        comment: '',
        ...formData,
        [field]: value,
        type: transactionsOptions[activeId],
      });
    },
    [activeId, formData],
  );

  const handleOnPress = () => {
    const newBalance = {
      [TransactionsTypes.INCOME]:
        Number(state.currentCard?.balance) + Number(formData?.amount),
      [TransactionsTypes.EXPENSE]:
        Number(state.currentCard?.balance) - Number(formData?.amount),
    };

    dispatch({
      type: ActionsTypes.UPDATE_BALANCE,
      payload: newBalance[transactionsOptions[activeId]],
    });
    dispatch({ type: ActionsTypes.ADD_TRANSACTION, payload: formData });

    setFormData(null);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.background}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <View style={styles.crossRow}>
              <IconButton onPress={handleCloseModal}>
                <CrossSVG />
              </IconButton>
            </View>
            <Text style={styles.modalTitle}>New transaction</Text>
            <View style={styles.toggleRow}>
              <Toggle
                options={transactionsOptions}
                onToggle={handleToggle}
                activeId={activeId}
              />
            </View>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={formData?.amount}
              style={styles.input}
              keyboardType="numeric"
              maxLength={7}
              placeholder="amount $"
              onChangeText={value => handleChangeText('amount', value)}
            />
            <TextInput
              value={formData?.comment}
              style={styles.input}
              keyboardType="default"
              maxLength={30}
              placeholder="comment"
              onChangeText={value => handleChangeText('comment', value)}
            />
          </View>
          <View style={styles.buttonRow}>
            <PrimaryButton title="Save" onPress={handleOnPress} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
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
  modalHeader: {},
  crossRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
    color: colors.black,
    fontWeight: '600',
  },
  toggleRow: {
    ...commonStyles.row,
    justifyContent: 'center',
  },
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
});
