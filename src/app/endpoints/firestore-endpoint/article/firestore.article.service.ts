import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
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
    return this.fetchOne(articleId);
  }

  getArticleByFile(fileName: string): Observable<UntypedArticle> {
    const queryFn: QueryFn = ref => ref.where('pdf.name', '==', fileName);
    return this.getArticleByQuery(queryFn);
  }

  getIssueArticles(issueId: string): Observable<UntypedArticle[]> {
    const queryFn: QueryFn = ref => ref.where('issueId', '==', issueId);
    return this.fetchData(queryFn);
  }

  postArticle(rawArticle: ArticleEntity): Observable<void> {
    return this.addDocument(rawArticle);
  }

  updateArticle(updatedArticle: UntypedArticle): Observable<void> {
    return this.updateDocument(updatedArticle.id, {
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
    });
  }

  deleteArticle(article: Article): Observable<void> {
    return this.deleteDocument(article.id)
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
    return this.fetchData(queryFn)
               .pipe(
                 map(data => data[0])
               );
  }

}
