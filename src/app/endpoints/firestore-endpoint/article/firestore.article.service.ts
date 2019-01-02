import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import {
  Article,
  ArticleEntity, UntypedArticle
} from 'app/models/article';

@Injectable()
export class FirestoreArticleService {

  private static collectionName: string = 'articles';

  constructor(private angularFirestore: AngularFirestore,
              private angularFireStorage: AngularFireStorage) {}

  getArticle(articleId: string): Observable<UntypedArticle> {

    const articleDocument: AngularFirestoreDocument = this.angularFirestore.doc(`${FirestoreArticleService.collectionName}/${articleId}`);
    return articleDocument.snapshotChanges()
                             .pipe(
                               map(action => {
                                 let data = action.payload.data() as ArticleEntity;
                                 return {
                                   id: action.payload.id,
                                   ...data
                                 };
                               })
                             );
  }

  getIssueArticles(issueId: string): Observable<UntypedArticle[]> {

    const articlesCollection = this.angularFirestore.collection<ArticleEntity>(FirestoreArticleService.collectionName, ref => ref.where('issueId', '==', issueId));
    return articlesCollection.snapshotChanges()
                             .pipe(
                               map(actions => actions.map(
                                 a => {
                                   let data = a.payload.doc.data() as ArticleEntity;
                                   return {
                                     id: a.payload.doc.id,
                                     ...data
                                   };
                                 }
                               ))
                             );

  }

  postArticle(rawArticle: ArticleEntity): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      this.angularFirestore.collection<ArticleEntity>(FirestoreArticleService.collectionName).add(rawArticle)
          .then(() => {
            observer.next(null);
            observer.complete();
          })
          .catch((reason) => observer.error(reason));
    });

  }

  deleteArticle(article: Article): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      const articleDocToBeDeleted: AngularFirestoreDocument<Article> = this.angularFirestore.doc(`${FirestoreArticleService.collectionName}/${article.id}`);
      articleDocToBeDeleted.delete()
        .then(() => {
          observer.next(null);
          observer.complete();
        })
        .catch((reason) => observer.error(reason));
    }).pipe(
      switchMap(() => {
        return this.angularFireStorage.ref(article.pdf.storagePath).delete();
      })
    );

  }

}
