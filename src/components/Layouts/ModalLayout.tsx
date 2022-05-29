import React, { PropsWithChildren } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { IconButton } from '../Buttons/IconButton';
import { CrossSVG } from '../../assets/SVGs/CrossSVG';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { commonStyles } from '../../constants/commonStyles';
import { colors } from '../../constants/colors';
import { ActionsTypes } from '../../constants/ActionsTypes';

interface Props {
  dispatch: React.Dispatch<{
    type: ActionsTypes;
    payload: null;
  }>;
  visible?: boolean;
  disabled?: boolean;
  onPressButton: () => void;
}

export const ModalLayout = ({
  dispatch,
  onPressButton,
  visible,
  disabled,
  children,
}: PropsWithChildren<Props>) => {
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
      <View style={styles.background}>
        <View style={styles.modal}>
          <View style={styles.crossRow}>
            <IconButton onPress={handleCloseModal}>
              <CrossSVG />
            </IconButton>
          </View>
          {children}
          <View style={styles.buttonRow}>
            <PrimaryButton
              disabled={disabled}
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
  buttonRow: {
    ...commonStyles.row,
    justifyContent: 'center',
    height: 50,
  },
});
