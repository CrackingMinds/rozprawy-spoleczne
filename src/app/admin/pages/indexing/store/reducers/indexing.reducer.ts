import { ActionReducer } from '@ngrx/store';

import {
  ADD_INDEXING_INFO_ITEM,
  ADD_INDEXING_INFO_ITEM_FAIL,
  IndexingInfoAction,
  LOAD_INDEXING_INFO,
  LOAD_INDEXING_INFO_FAIL,
  LOAD_INDEXING_INFO_SUCCESS,
  LoadIndexingInfoSuccessAction, REMOVE_INDEXING_INFO_ITEM, REMOVE_INDEXING_INFO_ITEM_FAIL,
  UPDATE_INDEXING_INFO_ITEM,
  UPDATE_INDEXING_INFO_ITEM_FAIL,
  ENDPOINT_CALL_FAIL, RESET_INDEXING_STATE
} from 'app/admin/pages/indexing/store/actions/indexing.actions';

import { IndexingInfo } from 'app/models/indexing';

export type IndexingState = {
  entities: IndexingInfo;
  loaded: boolean;
  loading: boolean;
};

export const initialState: IndexingState = {
  entities: [],
  loaded: false,
  loading: true
};

export const indexingReducer: ActionReducer<IndexingState> = reducer;

export function reducer(state = initialState, action: IndexingInfoAction): IndexingState {

  switch (action.type) {

    case ADD_INDEXING_INFO_ITEM: {
      return {
        ...state,
        loading: true
      };
    }

    case ADD_INDEXING_INFO_ITEM_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case LOAD_INDEXING_INFO: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_INDEXING_INFO_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: (action as LoadIndexingInfoSuccessAction).payload.indexingInfo
      };
    }

    case LOAD_INDEXING_INFO_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case UPDATE_INDEXING_INFO_ITEM: {
      return {
        ...state,
        loading: true
      };
    }

    case UPDATE_INDEXING_INFO_ITEM_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case REMOVE_INDEXING_INFO_ITEM: {
      return {
        ...state,
        loading: true
      };
    }

    case REMOVE_INDEXING_INFO_ITEM_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case RESET_INDEXING_STATE: {
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
