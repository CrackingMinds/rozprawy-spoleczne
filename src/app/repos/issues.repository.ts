import { Observable } from 'rxjs';

import { Issue } from 'app/models/issue';

export abstract class IssuesRepository {

  abstract getIssueForCurrentRoute(): Observable<Issue>;

  abstract getIssues(): Observable<Issue[]>;

  abstract getLoading(): Observable<boolean>;

}
