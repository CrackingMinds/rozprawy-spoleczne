import { Issue } from 'app/models/issue';

import {
  CREATE_ISSUE,
  CREATE_ISSUE_FAIL,
  IssueAction,
  LOAD_ISSUES,
  LOAD_ISSUES_FAIL,
  LOAD_ISSUES_SUCCESS, LoadIssuesSuccess, RELOAD_ISSUE_SUCCESS, ReloadIssueSuccess,
  REMOVE_ISSUE_FAIL,
  UPDATE_ISSUE_FAIL
} from 'app/admin/pages/library/store/actions/issue.actions';

export type IssueStoreEntity = { [id: string]: Issue };

export interface IssuesState {
  entities: IssueStoreEntity;
  loaded: boolean;
  loading: boolean;
}

export const initialState: IssuesState = {
  entities: {},
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

      const issues = (action as LoadIssuesSuccess).issues;

      const entities = issues.reduce((entities: IssueStoreEntity, issue: Issue) => {
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

    case RELOAD_ISSUE_SUCCESS: {

      const issue: Issue = (action as ReloadIssueSuccess).issue;

      const entities: IssueStoreEntity = { ...state.entities };
      entities[issue.id] = issue;

      return {
        ...state,
        entities
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
