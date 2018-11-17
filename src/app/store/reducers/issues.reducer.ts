import { IIssue } from 'app/models/issue';

import {
  CREATE_ISSUE_FAIL,
  IssuesAction,
  LOAD_ISSUES,
  LOAD_ISSUES_FAIL,
  LOAD_ISSUES_SUCCESS,
  REMOVE_ISSUE_FAIL,
  UPDATE_ISSUE_FAIL
} from 'app/store/actions/issues.actions';

type IssueEntities = { [id: string]: IIssue };

export interface IssueState {
  entities: IssueEntities;
  loaded: boolean;
  loading: boolean;
}

export const initialState: IssueState = {
  entities: {},
  loaded: false,
  loading: true
};

export function issuesReducer(state = initialState, action: IssuesAction): IssueState {

  switch (action.type) {

    case LOAD_ISSUES: {
      return {
        ...state,
        loading: true
      }
    }

    case LOAD_ISSUES_SUCCESS: {
      const issues = action.payload;
      const entities = issues.reduce((entities: IssueEntities, issue: IIssue) => {
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

export const getIssueEntities = (state: IssueState) => state.entities;
export const getIssuesLoading = (state: IssueState) => state.loading;
export const getIssuesLoaded = (state: IssueState) => state.loaded;
