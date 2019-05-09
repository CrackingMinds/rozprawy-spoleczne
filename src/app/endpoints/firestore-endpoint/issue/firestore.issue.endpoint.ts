import { Injectable } from '@angular/core';

import { Observable, Observer, zip } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument, QueryFn } from 'angularfire2/firestore';

import { Issue, IssueEntity, IssueEntityWithId, IssuesByYear, RawIssue } from 'app/models/issue';

import { FirestoreArticleService } from 'app/endpoints/firestore-endpoint/article/firestore.article.service';
import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';
import { Utils } from 'app/shared/utils';

@Injectable()
export class FirestoreIssueEndpoint extends IssueEndpoint {

  private static collectionName: string = 'issues';

  constructor(private angularFirestore: AngularFirestore,
              private firestoreArticleService: FirestoreArticleService) {
    super();
  }

  getAllIssues(): Observable<Issue[]> {

    const issuesCollection = this.angularFirestore.collection<IssueEntity>(FirestoreIssueEndpoint.collectionName);
    const issues: Observable<IssueEntityWithId[]> = issuesCollection.snapshotChanges()
                                                                  .pipe(
                                                                    map(actions => actions.map(a => {
                                                                      const data = a.payload.doc.data() as IssueEntity;
                                                                      return {
                                                                        id: a.payload.doc.id,
                                                                        ...data
                                                                      };
                                                                    }))
                                                                  );

    return issues
      .pipe(
        switchMap((issues: IssueEntityWithId[]) => {
          return zip(
            ...issues.map((issue: IssueEntityWithId) => {
              return this.addArticleInfo(issue);
            })
          );
        }),
        take(1)
      );

  }

  getAllIssuesByYear(): Observable<IssuesByYear> {

    const issuesCollection = this.angularFirestore.collection<IssueEntity>(FirestoreIssueEndpoint.collectionName);
    const issuesWithoutArticleInfo$ = issuesCollection.snapshotChanges()
                                                      .pipe(
                                                        map(actions => actions.map(a => {
                                                          const data = a.payload.doc.data() as IssueEntity;
                                                          return {
                                                            id: a.payload.doc.id,
                                                            ...data
                                                          };
                                                        }))
                                                      );
    const issues$: Observable<Issue[]> = issuesWithoutArticleInfo$
      .pipe(
        switchMap((issues: IssueEntityWithId[]) => {
          return zip(
            ...issues.map((issue: IssueEntityWithId) => {
              return this.addArticleInfo(issue);
            })
          );
        }),
        take(1)
      );

    return issues$
      .pipe(
        map((issues: Issue[]) => {
          return this.mapIssuesByYear(issues);
        })
      );
  }

  getIssue(id: string): Observable<Issue> {

    const issueDocument: AngularFirestoreDocument = this.angularFirestore.doc(`${FirestoreIssueEndpoint.collectionName}/${id}`);
    const issueEntity$ = issueDocument.snapshotChanges()
                                      .pipe(
                                        map(action => {
                                          const data = action.payload.data() as IssueEntity;
                                          return {
                                            id: action.payload.id,
                                            ...data
                                          };
                                        })
                                      );
    return issueEntity$
      .pipe(
        switchMap((entity) => {
          return this.addArticleInfo(entity);
        }),
        take(1)
      );
  }

  getCurrentIssue(): Observable<Issue> {
    const queryFn: QueryFn = ref => ref.where('isCurrent', '==', true);
    return this.getIssueByQuery(queryFn);
  }

  postIssue(rawIssue: RawIssue): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      this.angularFirestore.collection<IssueEntity>(FirestoreIssueEndpoint.collectionName).add(rawIssue)
          .then(() => {
            observer.next(null);
            observer.complete();
          })
          .catch((reason) => observer.error(reason));
    });

  }

  deleteIssue(issueId: string): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      const issueDocToBeDeleted: AngularFirestoreDocument<Issue> = this.angularFirestore.doc(`${FirestoreIssueEndpoint.collectionName}/${issueId}`);
      issueDocToBeDeleted.delete()
                         .then(() => {
                           observer.next(null);
                           observer.complete();
                         })
                         .catch((reason) => observer.error(reason));
    });

  }

  updateIssue(updatedIssue: Issue): Observable<void> {

    const persistedIssue: IssueEntity = {
      year: updatedIssue.year,
      vol: updatedIssue.vol,
      number: updatedIssue.number,
      isCurrent: updatedIssue.isCurrent
    };

    return Observable.create((observer: Observer<void>) => {
      const issueDocToBeUpdated: AngularFirestoreDocument<IssueEntity> = this.angularFirestore.doc(`${FirestoreIssueEndpoint.collectionName}/${updatedIssue.id}`);
      issueDocToBeUpdated.update(persistedIssue)
                         .then(() => {
                           observer.next(null);
                           observer.complete();
                         })
                         .catch((reason) => observer.error(reason));
    });

  }

  private getIssueByQuery(queryFn: QueryFn): Observable<Issue> {
    const issuesCollection = this.angularFirestore.collection<IssueEntity>(FirestoreIssueEndpoint.collectionName, queryFn);
    const issueEntity$ = issuesCollection.snapshotChanges()
                                         .pipe(
                                           map(actions => {
                                             const data = actions[0].payload.doc.data() as IssueEntity;
                                             return {
                                               id: actions[0].payload.doc.id,
                                               ...data
                                             };
                                           })
                                         );
    return issueEntity$
      .pipe(
        switchMap((entity) => {
          return this.addArticleInfo(entity);
        }),
        take(1)
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
