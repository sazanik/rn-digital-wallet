import React, { useContext } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../constants/colors';
import { checkInvalidData } from '../../utils/checkInvalidData';
import { ModalLayout } from '../Layouts/ModalLayout';
import { commonStyles } from '../../constants/commonStyles';
import { useCardScope } from '../../hooks/useCardScope';
import { AppContext } from '../../../App';

interface Props {
  visible?: boolean;
}

export const CardModal = ({ visible }: Props) => {
  const { dispatch } = useContext(AppContext);
  const { handlePressButton, handleChangeText, formData } = useCardScope({
    dispatch,
  });

  const isDisabled = checkInvalidData(formData);

  return (
    <ModalLayout
      visible={visible}
      disabled={isDisabled}
      onPressButton={handlePressButton}>
      <Text style={styles.modalTitle}>Add new card</Text>
      <View style={styles.toggleRow} />
      <View style={styles.formRow}>
        <TextInput
          value={formData?.name}
          style={styles.input}
          keyboardType="default"
          maxLength={20}
          placeholder="name"
          onChangeText={value => handleChangeText('name', value)}
        />
        <TextInput
          value={formData?.balance?.toString()}
          style={styles.input}
          keyboardType="numeric"
          maxLength={10}
          placeholder="initial balance $"
          onChangeText={value => handleChangeText('balance', value)}
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
