import { Card } from './Card';

export interface State {
  cards: Card[];
  currentCard: Card | null;
}
