import React, { PropsWithChildren, useContext } from 'react';
import { IconButton } from '../Buttons/IconButton';
import { CrossSVG } from '../../assets/SVGs/CrossSVG';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { commonStyles } from '../../constants/commonStyles';
import { colors } from '../../constants/colors';
import { ActionsTypes } from '../../constants/ActionsTypes';
import { AppContext } from '../../../App';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  visible?: boolean;
  disabled?: boolean;
  title?: string;
  onPressButton: () => void;
}

export const ModalLayout = ({
  onPressButton,
  visible,
  disabled,
  children,
  title,
}: PropsWithChildren<Props>) => {
  const { dispatch } = useContext(AppContext);
  const handleCloseModal = () => {
    dispatch({
      type: ActionsTypes.HIDE_MODAL,
      payload: null,
    });
  };

  const handlePressButton = () => {
    if (onPressButton) {
      onPressButton();
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-150}
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={styles.root}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={styles.crossRow}>
              <IconButton onPress={handleCloseModal}>
                <CrossSVG />
              </IconButton>
            </View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.children}>{children}</View>
          <View style={styles.buttonRow}>
            <PrimaryButton
              disabled={disabled}
              title="Save"
              onPress={handlePressButton}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    ...commonStyles.root,
    backgroundColor: colors.transparentDarkGrey,
  },

  modal: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: '50%',
    minHeight: 350,
    width: '90%',
    padding: 25,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  crossRow: {
    ...commonStyles.row,
    justifyContent: 'flex-end',
    marginTop: -10,
    marginLeft: 20,
    height: 20,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 26,
    color: colors.black,
    fontWeight: '600',
  },
  header: {
    height: 50,
  },
  children: {
    justifyContent: 'space-between',
    height: '60%',
  },
  buttonRow: {
    ...commonStyles.row,
    justifyContent: 'center',
    height: 50,
  },
});
