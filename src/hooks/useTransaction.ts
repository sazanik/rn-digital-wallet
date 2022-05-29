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

export const useTransaction = ({ state, dispatch }: Props) => {
  const [formData, setFormData] = useState<Transaction | null>(null);
  const [toggleActiveId, setToggleActiveId] = useState<ToggleIds>(0);

  const handleChangeText = useCallback(
    (field: FieldsTypes, value: string) => {
      setFormData({
        amount: '',
        comment: '',
        ...formData,
        [field]: value,
        type: transactionsOptions[toggleActiveId],
      });
    },
    [toggleActiveId, formData],
  );

  const handlePressButton = () => {
    const newBalance = {
      [TransactionsTypes.INCOME]:
        Number(state.activeCard?.balance) + Number(formData?.amount),
      [TransactionsTypes.EXPENSE]:
        Number(state.activeCard?.balance) - Number(formData?.amount),
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
