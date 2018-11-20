import { Observable } from 'rxjs';

import { IIssue, IRawIssue } from 'app/models/issue';

export interface IssueCrudService {

  getIssues(): Observable<IIssue[]>;
  getIssue(id?: string): Observable<IIssue>;
  postIssue(issue: IRawIssue): Observable<void>;
  deleteIssue(issue: IIssue): Observable<void>;
  updateIssue(issue: IIssue): Observable<void>;

}
