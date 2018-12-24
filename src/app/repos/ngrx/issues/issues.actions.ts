import { Action } from '@ngrx/store';

import { Issue, RawIssue } from 'app/models/issue';

export const LOAD_ISSUES = '[Issues] Load Issues';
export const LOAD_ISSUES_SUCCESS = '[Issues] Load Issues Success';
export const LOAD_ISSUES_FAIL = '[Issues] Load Issues Fail';

export const CREATE_ISSUE = '[Issues] Create Issue';
export const CREATE_ISSUE_FAIL = '[Issues] Create Issue Fail';

export const UPDATE_ISSUE = '[Issues] Update Issue';
export const UPDATE_ISSUE_FAIL = '[Issues] Update Issue Fail';

export const REMOVE_ISSUE = '[Issues] Remove Issue';
export const REMOVE_ISSUE_FAIL = '[Issues] Remove Issue Fail';

export class LoadIssues implements Action {
  readonly type: string = LOAD_ISSUES;
  constructor(public payload?: string) {}
}

export class LoadIssuesSuccess implements Action {
  readonly type: string = LOAD_ISSUES_SUCCESS;
  constructor(public payload: Issue[]) {}
}

export class LoadIssuesFail implements Action {
  readonly type: string = LOAD_ISSUES_FAIL;
  constructor(public payload: any) {}
}

export class CreateIssue implements Action {
  readonly type: string = CREATE_ISSUE;
  constructor(public payload: RawIssue) {}
}

export class CreateIssueFail implements Action {
  readonly type: string = CREATE_ISSUE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateIssue implements Action {
  readonly type: string = UPDATE_ISSUE;
  constructor(public payload: Issue) {}
}

export class UpdateIssueFail implements Action {
  readonly type: string = UPDATE_ISSUE_FAIL;
  constructor(public payload: any) {}
}

export class RemoveIssue implements Action {
  readonly type: string = REMOVE_ISSUE;
  constructor(public payload: Issue) {}
}

export class RemoveIssueFail implements Action {
  readonly type: string = REMOVE_ISSUE_FAIL;
  constructor(public payload: any) {}
}

export type IssuesAction =
  LoadIssues |
  LoadIssuesSuccess |
  LoadIssuesFail |

  CreateIssue |
  CreateIssueFail |

  UpdateIssue |
  UpdateIssueFail |

  RemoveIssue |
  RemoveIssueFail;
