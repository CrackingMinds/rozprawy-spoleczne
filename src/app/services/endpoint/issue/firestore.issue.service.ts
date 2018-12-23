import { Injectable } from '@angular/core';

import { Observable, Observer, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument, QueryFn } from 'angularfire2/firestore';

import { IIssue, IRawIssue } from 'app/models/issue';

import { FirestoreArticleService } from 'app/services/endpoint/article/firestore.article.service';
import { IssueService } from 'app/services/endpoint/issue/issue.service';

type IFirestoreIssue = IRawIssue;

@Injectable()
export class FirestoreIssueService extends IssueService {

  private static collectionName: string = 'issues';

  constructor(private angularFirestore: AngularFirestore,
              private firestoreArticleService: FirestoreArticleService) {
    super();
  }

  getIssues(): Observable<IIssue[]> {
    let issuesCollection = this.angularFirestore.collection<IFirestoreIssue>(FirestoreIssueService.collectionName);
    let rawIssues$ = issuesCollection.snapshotChanges()
                                     .pipe(
                                       map(actions => actions.map(a => {
                                         let data = a.payload.doc.data() as IFirestoreIssue;
                                         return {
                                           id: a.payload.doc.id,
                                           ...data,
                                           hasArticles: undefined
                                         };
                                       }))
                                     );
    return rawIssues$
      .pipe(
        switchMap((issues: IIssue[]) => this.processIssues(issues))
      );
  }

  getIssue(id?: string): Observable<IIssue> {
    let queryFunc: QueryFn;
    if (id) {
      queryFunc = ref => ref.where('id', '==', id);
    } else {
      queryFunc = ref => ref.where('isCurrent', '==', true);
    }
    const issuesCollection = this.angularFirestore.collection<IFirestoreIssue>(FirestoreIssueService.collectionName, queryFunc);
    let rawIssue$ = issuesCollection.snapshotChanges()
      .pipe(
        map(actions => {
          const data = actions[0].payload.doc.data() as IFirestoreIssue;
          return {
            id: actions[0].payload.doc.id,
            ...data,
            hasArticles: undefined
          };
        })
      );

    return rawIssue$
      .pipe(
        switchMap((issue: IIssue) => this.determineWhetherIssueHasArticles(issue))
      );
  }

  postIssue(issue: IRawIssue): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      this.angularFirestore.collection(FirestoreIssueService.collectionName).add(issue)
          .then(() => {
            observer.next(null);
            observer.complete();
          })
          .catch((reason) => observer.error(reason));
    });

  }

  deleteIssue(issue: IIssue): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      const issueDocToBeDeleted: AngularFirestoreDocument<IIssue> = this.angularFirestore.doc(`${FirestoreIssueService.collectionName}/${issue.id}`);
      issueDocToBeDeleted.delete()
                         .then(() => {
                           observer.next(null);
                           observer.complete();
                         })
                         .catch((reason) => observer.error(reason));
    });

  }

  updateIssue(issue: IIssue): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      const issueDocToBeUpdated: AngularFirestoreDocument<IIssue> = this.angularFirestore.doc(`${FirestoreIssueService.collectionName}/${issue.id}`);
      issueDocToBeUpdated.update(issue)
                         .then(() => {
                           observer.next(null);
                           observer.complete();
                         })
                         .catch((reason) => observer.error(reason));
    });

  }

  private processIssues(issues: IIssue[]): Observable<IIssue[]> {
    let issueObservables: Observable<IIssue>[] = issues.map((issue: IIssue) => {
      return this.determineWhetherIssueHasArticles(issue);
    });

    return zip(
      ...issueObservables
    );
  }

  private determineWhetherIssueHasArticles(issue: IIssue): Observable<IIssue> {
    return this.firestoreArticleService.hasArticles(issue)
               .pipe(
                 map((hasArticles: boolean) => {
                   return {
                     ...issue,
                     hasArticles
                   };
                 })
               );
  }
}
