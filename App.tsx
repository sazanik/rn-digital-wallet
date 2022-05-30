import * as React from 'react';
import { createContext, Dispatch, useReducer } from 'react';
import { Root } from './src/screens';
import { State } from './src/models/State';
import { ActionsTypes } from './src/constants/ActionsTypes';
import { ModalTypes } from './src/constants/ModalTypes';

const initialState: State = {
  activeModal: null,
  activeCard: null,
  cards: {},
};

const reducer = (
  state: State,
  action: { type: ActionsTypes; payload: any },
): State => {
  switch (action.type) {
    case ActionsTypes.SHOW_MODAL:
      return {
        ...state,
        activeModal: action.payload as ModalTypes,
      };

    case ActionsTypes.HIDE_MODAL:
      return {
        ...state,
        activeModal: null,
      };

    case ActionsTypes.ADD_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.name]: action.payload,
        },
      };

    case ActionsTypes.ADD_TRANSACTION: {
      if (!state.activeCard) {
        return state;
      }

      return {
        ...state,
        cards: {
          ...state.cards,
          [state.activeCard]: {
            ...state.cards[state.activeCard],
            transactions: [
              ...(state.cards[state.activeCard].transactions || []),
              action.payload,
            ],
          },
        },
      };
    }

    case ActionsTypes.UPDATE_BALANCE: {
      if (!state.activeCard) {
        return state;
      }

      return {
        ...state,
        cards: {
          ...state.cards,
          [state.activeCard]: {
            ...state.cards[state.activeCard],
            balance: action.payload,
          },
        },
      };
    }

    case ActionsTypes.SET_ACTIVE_CARD:
      return {
        ...state,
        activeCard: action.payload,
      };

    default:
      return state;
  }
};

export type ContextProps = {
  state: State;
  dispatch: Dispatch<{ type: ActionsTypes; payload: any }>;
};

export const AppContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
});

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Root />
    </AppContext.Provider>
  );
};

export default App;
