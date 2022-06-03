import { Transaction } from './Transaction';
import { colors } from '../constants/colors';

export type GradientColor = typeof colors[keyof typeof colors];

export interface Card extends Record<string, unknown> {
  name?: string;
  balance?: number | null;
  transactions?: Transaction[];
  gradient: [GradientColor, GradientColor];
}
