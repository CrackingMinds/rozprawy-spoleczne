import { ActionReducer } from '@ngrx/store';

import {
  ADD_EDITORIAL_BOARD_MEMBER,
  ADD_EDITORIAL_BOARD_MEMBER_FAIL,
  EditorialBoardAction,
  LOAD_EDITORIAL_BOARD,
  LOAD_EDITORIAL_BOARD_FAIL,
  LOAD_EDITORIAL_BOARD_SUCCESS,
  LoadEditorialBoardSuccess,
  REMOVE_EDITORIAL_BOARD_MEMBER,
  REMOVE_EDITORIAL_BOARD_MEMBER_FAIL,
  UPDATE_EDITORIAL_BOARD_MEMBER,
  UPDATE_EDITORIAL_BOARD_MEMBER_FAIL,
  ENDPOINT_CALL_FAIL, RESET_EDITORIAL_BOARD_STATE
} from 'app/admin/pages/editorial-board/store/actions/editorial.board.actions';

import { EditorialBoard } from 'app/models/editorial.board';

export type EditorialBoardState = {
  entities: EditorialBoard;
  loaded: boolean;
  loading: boolean;
}

export const initialState: EditorialBoardState = {
  entities: [],
  loaded: false,
  loading: true
};

export const editorialBoardReducer: ActionReducer<EditorialBoardState> = reducer;

export function reducer(state = initialState, action: EditorialBoardAction): EditorialBoardState {

  switch (action.type) {

    case ADD_EDITORIAL_BOARD_MEMBER: {
      return {
        ...state,
        loading: true
      };
    }

    case ADD_EDITORIAL_BOARD_MEMBER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case LOAD_EDITORIAL_BOARD: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_EDITORIAL_BOARD_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: (action as LoadEditorialBoardSuccess).editorialBoard
      };
    }

    case LOAD_EDITORIAL_BOARD_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case UPDATE_EDITORIAL_BOARD_MEMBER: {
      return {
        ...state,
        loading: true
      };
    }

    case UPDATE_EDITORIAL_BOARD_MEMBER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case REMOVE_EDITORIAL_BOARD_MEMBER: {
      return {
        ...state,
        loading: true
      };
    }

    case REMOVE_EDITORIAL_BOARD_MEMBER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case RESET_EDITORIAL_BOARD_STATE: {
      return initialState;
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
