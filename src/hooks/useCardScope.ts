import React, { useCallback, useState } from 'react';
import { FieldsTypes } from '../constants/FieldsTypes';
import { ActionsTypes } from '../constants/ActionsTypes';
import { Card, GradientColor } from '../models/Card';
import { getGradientColors } from '../utils/getGradientColors';

interface Props {
  dispatch: React.Dispatch<{
    type: ActionsTypes;
    payload: Card | null;
  }>;
}

export const useCardScope = ({ dispatch }: Props) => {
  const [formData, setFormData] = useState<Card | null>(null);

  const handleChangeText = useCallback(
    (field: FieldsTypes, value: string | number) => {
      setFormData({
        name: '',
        balance: null,
        ...formData,
        gradient: getGradientColors() as unknown as [
          GradientColor,
          GradientColor,
        ],
        [field]: value,
      });
    },
    [formData],
  );

  const handlePressButton = () => {
    dispatch({ type: ActionsTypes.ADD_CARD, payload: formData });

    setFormData(null);
  };

  return {
    handleChangeText,
    handlePressButton,
    formData,
  };
};
