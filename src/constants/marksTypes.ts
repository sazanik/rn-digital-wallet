import { TransactionsTypes } from './TransactionsTypes';

export const marksTypes: Record<TransactionsTypes, string> = {
  [TransactionsTypes.INCOME]: '+',
  [TransactionsTypes.EXPENSE]: '-',
};
