import { Transaction } from './Transaction';

export interface Card extends Record<string, unknown> {
  name?: string;
  balance?: number | null;
  transactions?: Transaction[];
}
