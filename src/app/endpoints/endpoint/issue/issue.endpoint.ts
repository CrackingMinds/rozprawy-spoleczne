import { Observable } from 'rxjs';

import { Issue, IssuesByYear, RawIssue } from 'app/models/issue';

export abstract class IssueEndpoint {

  abstract getIssue(id: string): Observable<Issue>;
  abstract getCurrentIssue(): Observable<Issue>;

  abstract getAllIssues(): Observable<Issue[]>;
  abstract getAllIssuesByYear(): Observable<IssuesByYear>;

  abstract postIssue(issue: RawIssue): Observable<void>;
  abstract deleteIssue(issueId: string): Observable<void>;
  abstract updateIssue(issue: Issue): Observable<void>;

}
