import { useCallback, useContext, useState } from 'react';
import { ToggleIds } from '../constants/ToggleIds';
import { Transaction } from '../models/Transaction';
import { FieldsTypes } from '../constants/FieldsTypes';
import { transactionsOptions } from '../components/Toggle/options';
import { TransactionsTypes } from '../constants/TransactionsTypes';
import { ActionsTypes } from '../constants/ActionsTypes';
import { AppContext } from '../modules/context';

export const useTransactionScope = () => {
  const { state, dispatch } = useContext(AppContext);
  const [formData, setFormData] = useState<Pick<
    Transaction,
    'comment' | 'amount'
  > | null>(null);
  const [toggleActiveId, setToggleActiveId] = useState<ToggleIds>(0);

  const handleChangeText = useCallback(
    (field: FieldsTypes, value: string | number) => {
      setFormData({
        amount: null,
        comment: '',
        ...formData,
        [field]: value,
      });
    },
    [formData],
  );

  const handlePressButton = useCallback(() => {
    if (!state?.activeCard) {
      return;
    }
    const currentBalance = Number(state?.cards[state.activeCard].balance);
    const newBalance = {
      [TransactionsTypes.INCOME]: currentBalance + Number(formData?.amount),
      [TransactionsTypes.EXPENSE]: currentBalance - Number(formData?.amount),
    };

    const fullData = { ...formData, type: transactionsOptions[toggleActiveId] };

    dispatch({ type: ActionsTypes.ADD_TRANSACTION, payload: fullData });

    dispatch({
      type: ActionsTypes.UPDATE_BALANCE,
      payload: newBalance[transactionsOptions[toggleActiveId]],
    });
    setFormData(null);
  }, [dispatch, formData, state, toggleActiveId]);

  const handleToggle = (id: ToggleIds) => {
    setToggleActiveId(id);
  };

  return {
    handleChangeText,
    handlePressButton,
    handleToggle,
    toggleActiveId,
    formData,
  };
};
