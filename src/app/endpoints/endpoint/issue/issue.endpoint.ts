import { Observable } from 'rxjs';

import { Issue, RawIssue } from 'app/models/issue';

export abstract class IssueEndpoint {

  abstract getIssue(id: string): Observable<Issue>;
  abstract getCurrentIssue(): Observable<Issue>;
  abstract getAllIssues(): Observable<Issue[]>;

  abstract postIssue(issue: RawIssue): Observable<void>;
  abstract deleteIssue(issue: Issue): Observable<void>;
  abstract updateIssue(issue: Issue): Observable<void>;

}
