import { TransactionsTypes } from '../../types/TransactionsTypes';

export const marksTypes: Record<TransactionsTypes, string> = {
  [TransactionsTypes.INCOME]: '+',
  [TransactionsTypes.EXPENSE]: '-',
};
