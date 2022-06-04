import { State } from '../models/State';
import { createContext, Dispatch } from 'react';
import { ActionsTypes } from '../constants/ActionsTypes';

interface Context {
  state: State;
  dispatch: Dispatch<{ type: ActionsTypes; payload: any }>;
}

export const initialState: State = {
  activeScreen: 'Home',
  activeModal: null,
  activeCard: null,
  cards: {},
};

export const AppContext = createContext<Context>({
  state: initialState,
  dispatch: () => {},
});
