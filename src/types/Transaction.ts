import { TransactionsTypes } from './TransactionsTypes';

export interface Transaction {
  type: TransactionsTypes;
  amount: string;
  comment?: string;
}
