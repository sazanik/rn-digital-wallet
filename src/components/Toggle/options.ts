import { TransactionsTypes } from '../../types/TransactionsTypes';

export const transactionsOptions = {
  0: TransactionsTypes.INCOME,
  1: TransactionsTypes.EXPENSE,
} as const;
