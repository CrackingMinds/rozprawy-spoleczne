import { ActionReducer } from '@ngrx/store';

import {
  ADD_SCIENTIFIC_BOARD_MEMBER,
  ADD_SCIENTIFIC_BOARD_MEMBER_FAIL,
  LOAD_SCIENTIFIC_BOARD,
  LOAD_SCIENTIFIC_BOARD_FAIL,
  LOAD_SCIENTIFIC_BOARD_SUCCESS,
  LoadScientificBoardSuccess,
  REMOVE_SCIENTIFIC_BOARD_MEMBER, REMOVE_SCIENTIFIC_BOARD_MEMBER_FAIL,
  ScientificBoardAction,
  UPDATE_SCIENTIFIC_BOARD_MEMBER,
  UPDATE_SCIENTIFIC_BOARD_MEMBER_FAIL,
  ENDPOINT_CALL_FAIL
} from 'app/admin/pages/scientific-board/store/actions/scientific.board.actions';

import { ScientificBoard } from 'app/models/scientific.board';

export type ScientificBoardState = {
  entities: ScientificBoard;
  loaded: boolean;
  loading: boolean;
};

export const initialState: ScientificBoardState = {
  entities: [],
  loaded: false,
  loading: true
};

export const scientificBoardReducer: ActionReducer<ScientificBoardState> = reducer;

export function reducer(state = initialState, action: ScientificBoardAction): ScientificBoardState {

  switch (action.type) {

    case ADD_SCIENTIFIC_BOARD_MEMBER: {
      return {
        ...state,
        loading: true
      };
    }

    case ADD_SCIENTIFIC_BOARD_MEMBER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case LOAD_SCIENTIFIC_BOARD: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_SCIENTIFIC_BOARD_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: (action as LoadScientificBoardSuccess).scientificBoard
      };
    }

    case LOAD_SCIENTIFIC_BOARD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case UPDATE_SCIENTIFIC_BOARD_MEMBER: {
      return {
        ...state,
        loading: true
      };
    }

    case UPDATE_SCIENTIFIC_BOARD_MEMBER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case REMOVE_SCIENTIFIC_BOARD_MEMBER: {
      return {
        ...state,
        loading: true
      };
    }

    case REMOVE_SCIENTIFIC_BOARD_MEMBER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case ENDPOINT_CALL_FAIL: {
      return {
        ...state,
        loading: false
      }
    }

  }

  return state;

}
