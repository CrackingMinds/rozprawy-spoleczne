import { Injectable } from '@angular/core';

import { Observable, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFirestore, QueryFn } from 'angularfire2/firestore';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';

import { Issue, IssueEntity, IssueEntityWithId, IssuesByYear, RawIssue } from 'app/models/issue';

import { FirestoreArticleService } from 'app/endpoints/firestore-endpoint/article/firestore.article.service';
import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';
import { Utils } from 'app/shared/utils';

@Injectable()
export class FirestoreIssueEndpoint extends FirestoreEndpoint<IssueEntity> implements IssueEndpoint {

  constructor(angularFirestore: AngularFirestore,
              private firestoreArticleService: FirestoreArticleService) { super(angularFirestore); }

  getAllIssues(): Observable<Issue[]> {
    return this.fetchData()
               .pipe(
                 switchMap((issues: IssueEntityWithId[]) => {
                   return zip(
                     ...issues.map((issue: IssueEntityWithId) => {
                       return this.addArticleInfo(issue);
                     })
                   );
                 })
               );
  }

  getAllIssuesByYear(): Observable<IssuesByYear> {
    return this.fetchData()
               .pipe(
                 switchMap((issues: IssueEntityWithId[]) => {
                   return zip(
                     ...issues.map((issue: IssueEntityWithId) => {
                       return this.addArticleInfo(issue);
                     })
                   );
                 }),
                 map((issues: Issue[]) => {
                   return this.mapIssuesByYear(issues);
                 })
               );
  }

  getIssue(id: string): Observable<Issue> {
    return this.fetchOne(id)
               .pipe(
                 switchMap((entity: IssueEntityWithId) => {
                   return this.addArticleInfo(entity);
                 })
               );
  }

  getCurrentIssue(): Observable<Issue> {
    const queryFn: QueryFn = ref => ref.where('isCurrent', '==', true);
    return this.getIssueByQuery(queryFn);
  }

  postIssue(rawIssue: RawIssue): Observable<void> {
    return this.addDocument(rawIssue);
  }

  deleteIssue(issueId: string): Observable<void> {
    return this.deleteDocument(issueId);
  }

  updateIssue(updatedIssue: Issue): Observable<void> {
    return this.updateDocument(updatedIssue.id, {
      year: updatedIssue.year,
      vol: updatedIssue.vol,
      number: updatedIssue.number,
      isCurrent: updatedIssue.isCurrent
    });
  }

  protected getCollectionName(): string {
    return 'issues';
  }

  private getIssueByQuery(queryFn: QueryFn): Observable<Issue> {
    return this.fetchData(queryFn)
               .pipe(
                 map(data => data[0]),
                 switchMap((entity) => {
                   return this.addArticleInfo(entity);
                 })
               );
  }

  private addArticleInfo(issue: IssueEntityWithId): Observable<Issue> {
    return this.firestoreArticleService.getIssueArticles(issue.id)
               .pipe(
                 map((articles) => {
                   if (articles.length) {
                     return {
                       ...issue,
                       hasArticles: true
                     };
                   } else {
                     return {
                       ...issue,
                       hasArticles: false
                     };
                   }
                 })
               );
  }

  private mapIssuesByYear(issues: Issue[]): IssuesByYear {
    let issuesByYear: IssuesByYear = {};
    issues.forEach((issue: Issue) => {

      if (issuesByYear[issue.year]) {
        issuesByYear[issue.year].push(issue);
      } else {
        issuesByYear[issue.year] = [issue];
      }

    });

    Object.keys(issuesByYear).forEach((year: string) => {
      issuesByYear[year] = Utils.sortIssues(issuesByYear[year]);
    });

    return issuesByYear;
  }
}
