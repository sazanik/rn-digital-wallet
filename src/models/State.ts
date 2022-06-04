import { Card } from './Card';
import { ModalTypes } from '../constants/ModalTypes';

export interface State {
  activeScreen: 'Home' | 'MyCards' | null;
  activeModal: ModalTypes | null;
  cards: Record<string, Card>;
  activeCard: string | null;
}
