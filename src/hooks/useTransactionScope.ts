import React, { useCallback, useState } from 'react';
import { ToggleIds } from '../constants/ToggleIds';
import { Transaction } from '../models/Transaction';
import { FieldsTypes } from '../constants/FieldsTypes';
import { transactionsOptions } from '../components/Toggle/options';
import { TransactionsTypes } from '../constants/TransactionsTypes';
import { ActionsTypes } from '../constants/ActionsTypes';
import { State } from '../models/State';

interface Props {
  dispatch: React.Dispatch<{
    type: ActionsTypes;
    payload: Transaction | number | null;
  }>;
  state: State;
}

export const useTransactionScope = ({ state, dispatch }: Props) => {
  const [formData, setFormData] = useState<Transaction | null>(null);
  const [toggleActiveId, setToggleActiveId] = useState<ToggleIds>(0);

  const handleChangeText = useCallback(
    (field: FieldsTypes, value: string | number) => {
      setFormData({
        amount: 0,
        comment: '',
        ...formData,
        [field]: value,
        type: transactionsOptions[toggleActiveId],
      });
    },
    [toggleActiveId, formData],
  );

  const handlePressButton = () => {
    if (!state.activeCard) {
      return;
    }
    const currentBalance = Number(state?.cards[state.activeCard].balance);
    const newBalance = {
      [TransactionsTypes.INCOME]: currentBalance + Number(formData?.amount),
      [TransactionsTypes.EXPENSE]: currentBalance - Number(formData?.amount),
    };

    dispatch({
      type: ActionsTypes.UPDATE_BALANCE,
      payload: newBalance[transactionsOptions[toggleActiveId]],
    });

    dispatch({ type: ActionsTypes.ADD_TRANSACTION, payload: formData });

    setFormData(null);
  };

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
