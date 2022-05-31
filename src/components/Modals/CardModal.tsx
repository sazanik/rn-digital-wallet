import React, { useContext } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../constants/colors';
import { checkInvalidData } from '../../utils/checkInvalidData';
import { ModalLayout } from '../Layouts/ModalLayout';
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
      title="Add new card"
      onPressButton={handlePressButton}>
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
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.transparentGrey,
    fontSize: 20,
    fontWeight: '500',
  },
});
