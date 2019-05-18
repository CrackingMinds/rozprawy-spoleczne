import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { Issue, IssuesByYear, RawIssue } from 'app/models/issue';

export const ISSUE_ENDPOINT = new InjectionToken<IssueEndpoint>('ISSUE_ENDPOINT');

export interface IssueEndpoint {

  getIssue(id: string): Observable<Issue>;
  getCurrentIssue(): Observable<Issue>;

  getAllIssues(): Observable<Issue[]>;
  getAllIssuesByYear(): Observable<IssuesByYear>;

  postIssue(issue: RawIssue): Observable<void>;
  deleteIssue(issueId: string): Observable<void>;
  updateIssue(issue: Issue): Observable<void>;

}
