import React, { PropsWithChildren, useContext } from 'react';
import { ModalTypes } from '../../constants/ModalTypes';
import { TransactionModal } from '../Modals/TransactionModal';
import { CardModal } from '../Modals/CardModal';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../../../App';

interface Props {
  title: string;
}

const modalsMap = {
  [ModalTypes.TRANSACTION]: TransactionModal,
  [ModalTypes.CARD]: CardModal,
  [ModalTypes.DEFAULT]: () => null,
};

export const ScreenLayout = ({ title, children }: PropsWithChildren<Props>) => {
  const { state } = useContext(AppContext);

  const CustomModal = modalsMap[state.activeModal || ModalTypes.DEFAULT];

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      {state.activeModal && <CustomModal visible={true} />}
      <View style={styles.horizontalWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  horizontalWrapper: {
    paddingHorizontal: '5%',
  },
  title: {
    width: '100%',
    marginTop: '5%',
    color: colors.black,
    fontWeight: '700',
    fontSize: 30,
  },
});
