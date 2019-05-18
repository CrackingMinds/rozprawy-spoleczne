import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFirestore, QueryFn } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';

import { Article, ArticleEntity, UntypedArticle } from 'app/models/article';

@Injectable()
export class FirestoreArticleService extends FirestoreEndpoint<ArticleEntity> {

  constructor(angularFirestore: AngularFirestore,
              private readonly angularFireStorage: AngularFireStorage) { super(angularFirestore); }

  getArticle(articleId: string): Observable<UntypedArticle> {
    return this.getDocument(articleId).snapshotChanges()
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
    const queryFn: QueryFn = ref => ref.where('issueId', '==', issueId);
    return this.getCollection(queryFn).snapshotChanges()
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
    return from(this.getCollection().add(rawArticle))
      .pipe(map(() => null));
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
    return from(this.getDocument(updatedArticle.id).update(persistedArticle));
  }

  deleteArticle(article: Article): Observable<void> {
    return from(this.getDocument(article.id).delete())
      .pipe(
        switchMap(() => {
          return this.angularFireStorage.ref(article.pdf.storagePath).delete();
        })
      );
  }

  protected getCollectionName(): string {
    return 'articles';
  }

  private getArticleByQuery(queryFn: QueryFn): Observable<UntypedArticle> {
    return this.getCollection(queryFn).snapshotChanges()
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
