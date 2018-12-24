import { Issue } from 'app/models/issue';

import {
  CREATE_ISSUE,
  CREATE_ISSUE_FAIL,
  IssuesAction,
  LOAD_ISSUES,
  LOAD_ISSUES_FAIL,
  LOAD_ISSUES_SUCCESS,
  REMOVE_ISSUE_FAIL,
  UPDATE_ISSUE_FAIL
} from 'app/repos/ngrx/issues/issues.actions';

export type IssueEntities = { [id: string]: Issue };

export interface IssuesState {
  entities: IssueEntities;
  loaded: boolean;
  loading: boolean;
}

export const initialState: IssuesState = {
  entities: {},
  loaded: false,
  loading: true
};

export function reducer(state = initialState, action: IssuesAction): IssuesState {

  switch (action.type) {

    case LOAD_ISSUES: {
      return {
        ...state,
        loading: true
      }
    }

    case LOAD_ISSUES_SUCCESS: {
      const issues = action.payload;
      const entities = issues.reduce((entities: IssueEntities, issue: Issue) => {
          return {
            ...entities,
            [issue.id]: issue
          };
        }, {});

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
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

export const getIssueEntities = (state: IssuesState) => state.entities;
export const getIssuesLoading = (state: IssuesState) => state.loading;
export const getIssuesLoaded = (state: IssuesState) => state.loaded;
