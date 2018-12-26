import { Injectable } from '@angular/core';

import { Observable, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument, QueryFn } from 'angularfire2/firestore';

import { Issue, IssueEntity, IssueEntityWithId, IssuesByYear, RawIssue } from 'app/models/issue';

import { FirestoreArticleService } from 'app/endpoints/firestore-endpoint/article/firestore.article.service';
import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';
import { Utils } from 'app/shared/services/utils';

@Injectable()
export class FirestoreIssueEndpoint extends IssueEndpoint {

  private static collectionName: string = 'issues';

  constructor(private angularFirestore: AngularFirestore,
              private firestoreArticleService: FirestoreArticleService) {
    super();
  }

  getAllIssues(): Observable<Issue[]> {
    return of([]);

    // let issuesCollection = this.angularFirestore.collection<IFirestoreIssue>(FirestoreIssueService.collectionName);
    // let rawIssues$ = issuesCollection.snapshotChanges()
    //                                  .pipe(
    //                                    map(actions => actions.map(a => {
    //                                      let data = a.payload.doc.data() as IFirestoreIssue;
    //                                      return {
    //                                        id: a.payload.doc.id,
    //                                        ...data,
    //                                        hasArticles: undefined
    //                                      };
    //                                    }))
    //                                  );
    // return rawIssues$
    //   .pipe(
    //     switchMap((issues: IIssue[]) => this.processIssues(issues))
    //   );

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
        })
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
      .pipe(switchMap((entity) => {
        return this.addArticleInfo(entity);
      }));
  }

  getCurrentIssue(): Observable<Issue> {
    const queryFn: QueryFn = ref => ref.where('isCurrent', '==', true);
    return this.getIssueByQuery(queryFn);
  }

  postIssue(issue: RawIssue): Observable<void> {

    return of(null);

    // return Observable.create((observer: Observer<void>) => {
    //   this.angularFirestore.collection(FirestoreIssueService.collectionName).add(issue)
    //       .then(() => {
    //         observer.next(null);
    //         observer.complete();
    //       })
    //       .catch((reason) => observer.error(reason));
    // });

  }

  deleteIssue(issueId: string): Observable<void> {

    return of(null);

    // return Observable.create((observer: Observer<void>) => {
    //   const issueDocToBeDeleted: AngularFirestoreDocument<IIssue> = this.angularFirestore.doc(`${FirestoreIssueService.collectionName}/${issue.id}`);
    //   issueDocToBeDeleted.delete()
    //                      .then(() => {
    //                        observer.next(null);
    //                        observer.complete();
    //                      })
    //                      .catch((reason) => observer.error(reason));
    // });

  }

  updateIssue(issue: Issue): Observable<void> {

    // TODO: Remove "hasArticles" property from issue instance
    // TODO: Remove "id" property from issue instance

    return of(null);

    // return Observable.create((observer: Observer<void>) => {
    //   const issueDocToBeUpdated: AngularFirestoreDocument<IIssue> = this.angularFirestore.doc(`${FirestoreIssueService.collectionName}/${issue.id}`);
    //   issueDocToBeUpdated.update(issue)
    //                      .then(() => {
    //                        observer.next(null);
    //                        observer.complete();
    //                      })
    //                      .catch((reason) => observer.error(reason));
    // });

  }

  // private processIssues(issues: IIssue[]): Observable<IIssue[]> {
  //   let issueObservables: Observable<IIssue>[] = issues.map((issue: IIssue) => {
  //     return this.addArticleInfo(issue);
  //   });
  //
  //   return zip(
  //     ...issueObservables
  //   );
  // }
  //

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
      .pipe(switchMap((entity) => {
        return this.addArticleInfo(entity);
      }));
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
        issuesByYear[issue.year] = [ issue ];
      }

    });

    Object.keys(issuesByYear).forEach((year: string) => {
      issuesByYear[year] = Utils.sortIssues(issuesByYear[year]);
    });

    return issuesByYear;
  }
}
