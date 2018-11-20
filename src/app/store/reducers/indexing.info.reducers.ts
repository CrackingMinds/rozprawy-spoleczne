import { IIndexing } from 'app/models/indexing';
import { IndexingInfoActions, LOAD_INDEXING_INFO, LOAD_INDEXING_INFO_FAIL, LOAD_INDEXING_INFO_SUCCESS } from 'app/store/actions/indexing.info.actions';

export interface IndexingInfoState {
  data: IIndexing[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: IndexingInfoState = {
  data: null,
  loaded: false,
  loading: true
};

export function indexingInfoReducer(state = initialState, action: IndexingInfoActions): IndexingInfoState {

  switch (action.type) {

    case LOAD_INDEXING_INFO: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_INDEXING_INFO_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data
      };
    }

    case LOAD_INDEXING_INFO_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

  }

  return state;
}

export const getIndexingInfo = (state: IndexingInfoState) => state.data;
export const getIndexingInfoLoading = (state: IndexingInfoState) => state.loading;
export const getIndexingInfoLoaded = (state: IndexingInfoState) => state.loaded;
