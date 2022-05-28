import { Card } from './Card';

export interface State {
  cards: Card[];
  activeCard: Card | null;
}
