import { Injectable } from '@angular/core';

import { Observable, zip, from } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

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
    const issues: Observable<IssueEntityWithId[]> = this.getCollection().snapshotChanges()
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
    const issuesWithoutArticleInfo$ = this.getCollection().snapshotChanges()
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
    const issueEntity$ = this.getDocument(id).snapshotChanges()
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
    return from(this.getCollection().add(rawIssue))
      .pipe(map(() => null));
  }

  deleteIssue(issueId: string): Observable<void> {
    return from(this.getDocument(issueId).delete());
  }

  updateIssue(updatedIssue: Issue): Observable<void> {
    const persistedIssue: IssueEntity = {
      year: updatedIssue.year,
      vol: updatedIssue.vol,
      number: updatedIssue.number,
      isCurrent: updatedIssue.isCurrent
    };
    return from(this.getDocument(updatedIssue.id).update(persistedIssue));
  }

  protected getCollectionName(): string {
    return 'issues';
  }

  private getIssueByQuery(queryFn: QueryFn): Observable<Issue> {
    const issueEntity$ = this.getCollection(queryFn).snapshotChanges()
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
