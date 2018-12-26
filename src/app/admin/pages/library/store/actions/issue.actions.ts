import { Action } from '@ngrx/store';

import { Issue, RawIssue } from 'app/models/issue';

import { ACTION_PREFIX } from 'app/admin/pages/library/store/actions/action.prefix';

export const LOAD_ISSUES = `${ACTION_PREFIX} Load Issues`;
export const LOAD_ISSUES_SUCCESS = `${ACTION_PREFIX} Load Issues Success`;
export const LOAD_ISSUES_FAIL = `${ACTION_PREFIX} Load Issues Fail`;

export const CREATE_ISSUE = `${ACTION_PREFIX} Create Issue`;
export const CREATE_ISSUE_FAIL = `${ACTION_PREFIX} Create Issue Fail`;

export const UPDATE_ISSUE = `${ACTION_PREFIX} Update Issue`;
export const UPDATE_ISSUE_FAIL = `${ACTION_PREFIX} Update Issue Fail`;

export const REMOVE_ISSUE = `${ACTION_PREFIX} Remove Issue`;
export const REMOVE_ISSUE_FAIL = `${ACTION_PREFIX} Remove Issue Fail`;

export class LoadIssues implements Action {
  readonly type: string = LOAD_ISSUES;
  constructor() {}
}

export class LoadIssuesSuccess implements Action {
  readonly type: string = LOAD_ISSUES_SUCCESS;
  constructor(public issues: Issue[]) {}
}

export class LoadIssuesFail implements Action {
  readonly type: string = LOAD_ISSUES_FAIL;
  constructor(public error: any) {}
}

export class CreateIssue implements Action {
  readonly type: string = CREATE_ISSUE;
  constructor(public issue: RawIssue) {}
}

export class CreateIssueFail implements Action {
  readonly type: string = CREATE_ISSUE_FAIL;
  constructor(public error: any) {}
}

export class UpdateIssue implements Action {
  readonly type: string = UPDATE_ISSUE;
  constructor(public issue: Issue) {}
}

export class UpdateIssueFail implements Action {
  readonly type: string = UPDATE_ISSUE_FAIL;
  constructor(public error: any) {}
}

export class RemoveIssue implements Action {
  readonly type: string = REMOVE_ISSUE;
  constructor(public issueId: string) {}
}

export class RemoveIssueFail implements Action {
  readonly type: string = REMOVE_ISSUE_FAIL;
  constructor(public error: any) {}
}

export type IssueAction =
  LoadIssues |
  LoadIssuesSuccess |
  LoadIssuesFail |

  CreateIssue |
  CreateIssueFail |

  UpdateIssue |
  UpdateIssueFail |

  RemoveIssue |
  RemoveIssueFail;
