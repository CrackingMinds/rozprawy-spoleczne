import { Observable } from 'rxjs';

import { IIssue, IRawIssue } from 'app/models/issue';

export abstract class IssueService {

  abstract getIssues(): Observable<IIssue[]>;
  abstract getIssue(id?: string): Observable<IIssue>;
  abstract postIssue(issue: IRawIssue): Observable<void>;
  abstract deleteIssue(issue: IIssue): Observable<void>;
  abstract updateIssue(issue: IIssue): Observable<void>;

}
