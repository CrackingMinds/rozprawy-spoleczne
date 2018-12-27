import { Issue } from 'app/models/issue';

import {
  CREATE_ISSUE,
  CREATE_ISSUE_FAIL,
  IssueAction,
  LOAD_ISSUES,
  LOAD_ISSUES_FAIL,
  LOAD_ISSUES_SUCCESS, LoadIssuesSuccess,
  REMOVE_ISSUE_FAIL,
  UPDATE_ISSUE_FAIL
} from 'app/admin/pages/library/store/actions/issue.actions';

export interface IssuesState {
  entities: Issue[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: IssuesState = {
  entities: [],
  loaded: false,
  loading: true
};

export function reducer(state = initialState, action: IssueAction): IssuesState {

  switch (action.type) {

    case LOAD_ISSUES: {
      return {
        ...state,
        loading: true
      }
    }

    case LOAD_ISSUES_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: (action as LoadIssuesSuccess).issues
      }
    }

    case LOAD_ISSUES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

    case CREATE_ISSUE: {
      return {
        ...state,
        loading: true
      }
    }

    case CREATE_ISSUE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

    case REMOVE_ISSUE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

    case UPDATE_ISSUE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

  }

  return state;
}

export const getEntities = (state: IssuesState) => state.entities;
export const getLoading = (state: IssuesState) => state.loading;
export const getLoaded = (state: IssuesState) => state.loaded;
