import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../constants/colors';
import { Toggle } from '../Toggle';
import { transactionsOptions } from '../Toggle/options';
import { checkInvalidData } from '../../utils/checkInvalidData';
import { useTransactionScope } from '../../hooks/useTransactionScope';
import { ModalLayout } from '../Layouts/ModalLayout';
import { commonStyles } from '../../constants/commonStyles';
import { AppContext } from '../../../App';

interface Props {
  visible?: boolean;
}

export const TransactionModal = ({ visible }: Props) => {
  const { dispatch, state } = useContext(AppContext);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const {
    handlePressButton,
    handleToggle,
    toggleActiveId,
    handleChangeText,
    formData,
  } = useTransactionScope({ state, dispatch });

  useEffect(() => {
    setDisabled(checkInvalidData(formData));
  }, [formData]);

  return (
    <ModalLayout
      dispatch={dispatch}
      visible={visible}
      disabled={isDisabled}
      onPressButton={handlePressButton}>
      <Text style={styles.modalTitle}>Add new transaction</Text>
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
});
