import React, { PropsWithChildren, ReactNode, useContext } from 'react';
import { ModalTypes } from '../../constants/ModalTypes';
import { TransactionModal } from '../Modals/TransactionModal';
import { CardModal } from '../Modals/CardModal';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../../../App';

interface Props {
  title: string;
  rightHeaderComponent?: ReactNode;
}

const modalsMap = {
  [ModalTypes.TRANSACTION]: TransactionModal,
  [ModalTypes.CARD]: CardModal,
  [ModalTypes.DEFAULT]: () => null,
};

export const ScreenLayout = ({
  title,
  children,
  rightHeaderComponent,
}: PropsWithChildren<Props>) => {
  const { state } = useContext(AppContext);

  const CustomModal = modalsMap[state.activeModal || ModalTypes.DEFAULT];

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      {state.activeModal && <CustomModal visible={true} />}
      <View style={styles.horizontalWrapper}>
        <Text style={styles.title}>{title}</Text>
        {rightHeaderComponent}
      </View>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  horizontalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: '5%',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: colors.lightGrey,
  },
  title: {
    textAlign: 'left',
    marginTop: '5%',
    marginBottom: 5,
    color: colors.black,
    fontWeight: '700',
    fontSize: 30,
  },
});
