import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IIssue, IRawIssue } from 'app/models/issue';

import { FirestoreIssueService } from 'app/services/firestore/issue.service';
import { IssueCrudService } from 'app/services/issue.crud.service';

@Injectable()
export class IssueService implements IssueCrudService {

  constructor(private firestoreIssueService: FirestoreIssueService) {
  }

  getIssues(): Observable<IIssue[]> {
    return this.firestoreIssueService.getIssues();
  }

  postIssue(issue: IRawIssue): Observable<void> {
    return this.firestoreIssueService.postIssue(issue);
  }

  deleteIssue(issue: IIssue): Observable<void> {
    return this.firestoreIssueService.deleteIssue(issue);
  }

  updateIssue(issue: IIssue): Observable<void> {
    return this.firestoreIssueService.updateIssue(issue);
  }

}
