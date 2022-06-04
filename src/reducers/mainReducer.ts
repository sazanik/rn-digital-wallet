import { State } from '../models/State';
import { ActionsTypes } from '../constants/ActionsTypes';
import { ModalTypes } from '../constants/ModalTypes';
import { setData, updateData } from '../modules/asyncStorage';
import { StorageKeys } from '../constants/StorageKeys';

export const mainReducer = (
  state: State,
  action: { type: ActionsTypes; payload: any },
): State => {
  switch (action.type) {
    case ActionsTypes.SET_SCREEN: {
      const newState = {
        ...state,
        activeScreen: action.payload,
      };

      updateData(StorageKeys.STATE, newState);

      return newState;
    }

    case ActionsTypes.SET_STATE: {
      const newState = {
        ...action.payload,
      };

      updateData(StorageKeys.STATE, newState);

      return newState;
    }

    case ActionsTypes.SHOW_MODAL: {
      const newState = {
        ...state,
        activeModal: action.payload as ModalTypes,
      };

      updateData(StorageKeys.STATE, newState);

      return newState;
    }

    case ActionsTypes.HIDE_MODAL: {
      const newState = {
        ...state,
        activeModal: null,
      };

      updateData(StorageKeys.STATE, newState);

      return newState;
    }

    case ActionsTypes.ADD_CARD: {
      const newState = {
        ...state,
        activeCard: action.payload.name,
        cards: {
          ...state.cards,
          [action.payload.name]: action.payload,
        },
      };

      updateData(StorageKeys.STATE, newState);

      return newState;
    }

    case ActionsTypes.DELETE_CARD: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.payload]: deletedCard, ...otherCards } = state.cards;
      const newState = {
        ...state,
        cards: {
          ...otherCards,
        },
      };

      setData(StorageKeys.STATE, newState);

      return newState;
    }

    case ActionsTypes.ADD_TRANSACTION: {
      if (!state.activeCard) {
        return state;
      }

      const newState = {
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

      updateData(StorageKeys.STATE, newState);

      return newState;
    }

    case ActionsTypes.UPDATE_BALANCE: {
      if (!state.activeCard) {
        return state;
      }

      const newState = {
        ...state,
        cards: {
          ...state.cards,
          [state.activeCard]: {
            ...state.cards[state.activeCard],
            balance: action.payload,
          },
        },
      };

      updateData(StorageKeys.STATE, newState);

      return newState;
    }

    case ActionsTypes.SET_ACTIVE_CARD: {
      const newState = {
        ...state,
        activeCard: action.payload,
      };

      updateData(StorageKeys.STATE, newState);

      return newState;
    }

    default:
      return state;
  }
};
