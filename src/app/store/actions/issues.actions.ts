import { Action } from '@ngrx/store';

import { IIssue } from 'app/models/issue';

export const LOAD_ISSUES = '[Issues] Load Issues';
export const LOAD_ISSUES_SUCCESS = '[Issues] Load Issues Success';
export const LOAD_ISSUES_FAIL = '[Issues] Load Issues Fail';

export class LoadIssues implements Action {
  readonly type: string = LOAD_ISSUES;
  constructor(public payload?: string) {}
}

export class LoadIssuesSuccess implements Action {
  readonly type: string = LOAD_ISSUES_SUCCESS;
  constructor(public payload: IIssue[]) {}
}

export class LoadIssuesFail implements Action {
  readonly type: string = LOAD_ISSUES_FAIL;
  constructor(public payload: any) {}
}

export type IssuesAction = LoadIssues | LoadIssuesSuccess | LoadIssuesFail;
