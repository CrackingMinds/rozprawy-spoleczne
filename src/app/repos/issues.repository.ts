import { Observable } from 'rxjs';

import { IIssue } from 'app/models/issue';

export abstract class IssuesRepository {

  abstract getIssueForCurrentRoute(): Observable<IIssue>;

  abstract getIssues(): Observable<IIssue[]>;

  abstract getLoading(): Observable<boolean>;

}
