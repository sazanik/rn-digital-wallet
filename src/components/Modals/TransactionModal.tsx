import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { IconButton } from '../Buttons/IconButton';
import { CrossSVG } from '../../assets/SVGs/CrossSVG';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { commonStyles } from '../../constants/commonStyles';
import { colors } from '../../constants/colors';
import { Toggle } from '../Toggle';
import { transactionsOptions } from '../Toggle/options';
import { Transaction } from '../../models/Transaction';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { State } from '../../models/State';
import { checkInvalidData } from '../../utils/checkInvalidData';
import { useTransaction } from '../../hooks/useTransaction';

interface Props {
  dispatch: React.Dispatch<{
    type: ActionsTypes;
    payload: Transaction | number | null;
  }>;
  state: State;
  visible?: boolean;
}

export const TransactionModal = ({ visible, state, dispatch }: Props) => {
  const {
    handlePressButton,
    handleToggle,
    toggleActiveId,
    handleChangeText,
    formData,
  } = useTransaction({ state, dispatch });
  const [isDisabled, setDisabled] = useState<boolean>(true);

  const handleCloseModal = () => {
    dispatch({
      type: ActionsTypes.HIDE_MODAL,
      payload: null,
    });
  };

  useEffect(() => {
    setDisabled(checkInvalidData(formData));
  }, [formData]);

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
                activeId={toggleActiveId}
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
              maxLength={20}
              placeholder="comment"
              onChangeText={value => handleChangeText('comment', value)}
            />
          </View>
          <View style={styles.buttonRow}>
            <PrimaryButton
              disabled={isDisabled}
              title="Save"
              onPress={handlePressButton}
            />
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
