import { Transaction } from './Transaction';

export interface Card {
  name?: string;
  balance?: number;
  transactions?: Transaction[];
}
