import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IIssue, IRawIssue } from 'app/models/issue';

import { FirestoreIssueService } from 'app/services/firestore/issue.service';

@Injectable()
export class IssueService {

  constructor(private firestoreIssueService: FirestoreIssueService) {
  }

  getIssues(): Observable<IIssue[]> {
    return this.firestoreIssueService.getIssues();
  }

  postIssue(issue: IRawIssue): Observable<void> {
    return this.firestoreIssueService.postIssue(issue);
  }

  getIssue(id) {
    // return this.http.get(this.backendUrl + '/issues/' + id);
  }

  getCurrentIssue() {
    // return this.http.get(this.backendUrl + '/issues/current');
  }

  getAllIssues() {
    // return this.http.get(this.backendUrl + '/issues');
  }

  getAllIssuesWithArticles() {
    // return this.http.get(this.backendUrl + '/issues/articles');
  }

  putIssueData(issueId: string, updatedIssueData: any) {
    // return this.http.put(this.backendUrl + '/issues/' + issueId, updatedIssueData, this.httpOptions);
  }

  deleteIssue(issueId: string) {
    // return this.http.delete(this.backendUrl + '/issues/' + issueId, this.httpOptions);
  }
}
