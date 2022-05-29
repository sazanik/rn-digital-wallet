import { TransactionsTypes } from '../constants/TransactionsTypes';

export interface Transaction {
  type: TransactionsTypes;
  amount: number;
  comment?: string;
}
