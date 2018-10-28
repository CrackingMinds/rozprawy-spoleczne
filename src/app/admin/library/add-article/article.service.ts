import { Injectable } from '@angular/core';

import { Observable, zip, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';

import { Article, IArticle } from 'app/models/article';
import { FArticle } from 'app/models/firestore/f.article';
import { IArticleType } from 'app/models/article.type';
import { ArticleTypesService } from 'app/services/article.types.service';

@Injectable()
export class ArticleService {

  private static collectionName: string = 'articles';

  constructor(private angularFirestore: AngularFirestore,
              private articleTypesService: ArticleTypesService) {
  }

  getArticlesInIssue(issueId: string): Observable<Article[]> {

    let article$ = this.getArticlesFromFirestore(issueId);
    return article$
      .pipe(
        switchMap((articles: IArticle[]) => {
          if (articles.length === 0) {
            return of([]);
          }
          return this.getArticleTypeForEachArticle(articles);
        })
      );
  }

  postArticle(article: FArticle): Promise<void> {
    return new Promise<void>(resolve => {
      this.angularFirestore.collection(ArticleService.collectionName).add(article).then((doc: DocumentReference) => {
        resolve();
      });
    });
  }

  private getArticlesFromFirestore(issueId: string): Observable<IArticle[]> {
    let issueArticlesCollection = this.angularFirestore.collection<FArticle>(ArticleService.collectionName, ref => ref.where('issueId', '==', issueId));
    return issueArticlesCollection.snapshotChanges()
                                  .pipe(
                                    map(actions => actions.map(
                                      a => {
                                        let data = a.payload.doc.data() as FArticle;
                                        return {
                                          id: a.payload.doc.id,
                                          data: data
                                        };
                                      }
                                    ))
                                  );
  }

  private getArticleTypeForEachArticle(articles: IArticle[]): Observable<Article[]> {

    let arr: Observable<Article>[] = articles.map((article: IArticle) => {
      return this.getArticleWithArticleType(article);
    });

    let zipped: Observable<Article[]> = zip(
      ...arr
    );

    return zipped;
  }

  private getArticleWithArticleType(article: IArticle): Observable<Article> {
    return this.articleTypesService.getArticleType(article.data.articleTypeId)
               .pipe(
                 map((articleType: IArticleType) => {
                   return new Article(article.data)
                     .withArticleType(articleType);
                 })
               );
  }
}
