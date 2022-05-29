import { Card } from './Card';
import { ModalTypes } from '../constants/ModalTypes';

export interface State {
  activeModal: ModalTypes | null;
  cards: Record<string, Card>;
  activeCard: string | null;
}
