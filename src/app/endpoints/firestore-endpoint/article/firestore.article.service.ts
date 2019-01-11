import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument, QueryFn } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { Article, ArticleEntity, UntypedArticle } from 'app/models/article';

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

  getArticleByFile(fileName: string): Observable<UntypedArticle> {
    const queryFn: QueryFn = ref => ref.where('pdf.name', '==', fileName);
    return this.getArticleByQuery(queryFn);
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

  updateArticle(updatedArticle: UntypedArticle): Observable<void> {

    const persistedArticle: ArticleEntity = {
      issueId: updatedArticle.issueId,
      authors: updatedArticle.authors,
      pdf: updatedArticle.pdf,
      keywords: updatedArticle.keywords,
      conclusions: updatedArticle.conclusions,
      results: updatedArticle.results,
      materialsAndMethods: updatedArticle.materialsAndMethods,
      introduction: updatedArticle.introduction,
      doi: updatedArticle.doi,
      pages: updatedArticle.pages,
      title: updatedArticle.title,
      articleTypeId: updatedArticle.articleTypeId
    };

    return Observable.create((observer: Observer<void>) => {
      const articleDocToBeUpdated: AngularFirestoreDocument<ArticleEntity> = this.angularFirestore.doc(`${FirestoreArticleService.collectionName}/${updatedArticle.id}`);
      articleDocToBeUpdated.update(persistedArticle)
        .then(() => {
          observer.next(null);
          observer.complete();
        })
        .catch(reason => observer.error(reason));
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

  private getArticleByQuery(queryFn: QueryFn): Observable<UntypedArticle> {
    const articleCollection = this.angularFirestore.collection<ArticleEntity>(FirestoreArticleService.collectionName, queryFn);
    return articleCollection.snapshotChanges()
                            .pipe(
                              map(actions => {
                                  if (!actions.length) {
                                    return null;
                                  }

                                  const data = actions[0].payload.doc.data() as ArticleEntity;
                                  return {
                                    id: actions[0].payload.doc.id,
                                    ...data
                                  };
                                }
                              ));
  }

}
