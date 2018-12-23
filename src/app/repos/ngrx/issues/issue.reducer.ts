import { IIssue } from 'app/models/issue';
import { IssueActions, LOAD_ISSUE, LOAD_ISSUE_FAIL, LOAD_ISSUE_SUCCESS } from 'app/repos/ngrx/issues/issue.actions';

export interface IssueState {
  issue: IIssue;
  loaded: boolean;
  loading: boolean;
}

export const initialState: IssueState = {
  issue: null,
  loaded: false,
  loading: true
};

export function issueReducer(state = initialState, action: IssueActions): IssueState {

  switch (action.type) {

    case LOAD_ISSUE: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_ISSUE_SUCCESS: {
      const issue = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        issue
      };
    }

    case LOAD_ISSUE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }
  }

  return state;
}

export const getIssue = (state: IssueState) => state.issue;
export const getIssueLoading = (state: IssueState) => state.loading;
export const getIssueLoaded = (state: IssueState) => state.loaded;
