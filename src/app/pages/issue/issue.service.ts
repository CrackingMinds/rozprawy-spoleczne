import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { IIssue } from 'app/models/issue';
import { FIssue } from 'app/models/firestore/f.issue';

@Injectable()
export class IssueService {

  private static collectionName: string = 'issues';

  constructor(private angularFirestore: AngularFirestore) {
  }

  getIssues(): Observable<IIssue[]> {
    let issuesCollection = this.angularFirestore.collection<FIssue>(IssueService.collectionName);
    return issuesCollection.snapshotChanges()
                           .pipe(
                             map(actions => actions.map(a => {
                               let data = a.payload.doc.data() as FIssue;
                               return {
                                 id: a.payload.doc.id,
                                 data: data
                               };
                             }))
                           );
    }

  postIssue(issue: FIssue): Promise<void> {
    return new Promise<void>(resolve => {
      this.angularFirestore.collection(IssueService.collectionName).add(issue).then(() => {
        resolve();
      });
    });
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
