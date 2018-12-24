import { Action } from '@ngrx/store';

import { Issue } from 'app/models/issue';

export const LOAD_ISSUE = '[Issue] Load Issue by ID';
export const LOAD_ISSUE_SUCCESS = '[Issue] Load Issue by ID Success';
export const LOAD_ISSUE_FAIL = '[Issue] Load Issue by ID Fail';

export class LoadIssue implements Action {
  readonly type: string = LOAD_ISSUE;

  constructor(public payload?: string) {
  }
}

export class LoadIssueSuccess implements Action {
  readonly type: string = LOAD_ISSUE_SUCCESS;

  constructor(public payload: Issue) {
  }
}

export class LoadIssueFail implements Action {
  readonly type: string = LOAD_ISSUE_FAIL;

  constructor(public payload: any) {
  }
}

export type IssueActions =
  LoadIssue |
  LoadIssueSuccess |
  LoadIssueFail;
