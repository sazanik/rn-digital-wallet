import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../constants/colors';
import { Toggle } from '../Toggle';
import { transactionsOptions } from '../Toggle/options';
import { checkInvalidData } from '../../utils/checkInvalidData';
import { useTransactionScope } from '../../hooks/useTransactionScope';
import { ModalLayout } from '../Layouts/ModalLayout';
import { commonStyles } from '../../constants/commonStyles';
import { Transaction } from '../../models/Transaction';

interface Props {
  visible?: boolean;
}

export const TransactionModal = ({ visible }: Props) => {
  const {
    handlePressButton,
    handleToggle,
    toggleActiveId,
    handleChangeText,
    formData,
  } = useTransactionScope();

  const isDisabled = checkInvalidData(formData as Transaction);

  return (
    <ModalLayout
      visible={visible}
      disabled={isDisabled}
      title="Add new transaction"
      onPressButton={handlePressButton}>
      <View style={styles.toggleRow}>
        <Toggle
          options={transactionsOptions}
          onToggle={handleToggle}
          activeId={toggleActiveId}
        />
      </View>
      <View style={styles.formRow}>
        <TextInput
          value={formData?.amount?.toString()}
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
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  formRow: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.transparentGrey,
    fontSize: 20,
    fontWeight: '500',
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
    marginTop: -20,
    marginBottom: 30,
  },
});
