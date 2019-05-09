import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';

import { Article, ArticleEntity, UntypedArticle } from 'app/models/article';
import { ArticleType } from 'app/models/article.type';

import { ArticleEndpoint } from 'app/endpoints/endpoint/article/article.endpoint';

import { FirestoreArticleService } from 'app/endpoints/firestore-endpoint/article/firestore.article.service';
import { FirestoreArticleTypeService } from 'app/endpoints/firestore-endpoint/article-type/firestore.article.type.service';

@Injectable()
export class FirestoreArticleEndpoint extends ArticleEndpoint {

  constructor(private articleService: FirestoreArticleService,
              private articleTypeService: FirestoreArticleTypeService) { super(); }

  getIssueArticles(issueId: string): Observable<Article[]> {
    return this.articleService.getIssueArticles(issueId)
      .pipe(
        switchMap((untypedArticles: UntypedArticle[]) => {
          return this.replaceTypeIdsWithTypes(untypedArticles);
        }),
        take(1)
      );
  }

  getArticle(articleId: string): Observable<Article> {
    return this.articleService.getArticle(articleId)
      .pipe(
        switchMap((untypedArticle: UntypedArticle) => {
          return this.replaceTypeIdsWithTypes([untypedArticle])
            .pipe(
              map((articles: Article[]) => articles[0])
            )
        }),
        take(1)
      );
  }

  postArticle(rawArticle: ArticleEntity): Observable<void> {
   return this.articleService.postArticle(rawArticle);
  }

  updateArticle(updatedArticle: UntypedArticle): Observable<void> {
    return this.articleService.updateArticle(updatedArticle);
  }

  deleteArticle(article: Article): Observable<void> {
    return this.articleService.deleteArticle(article);
  }

  private replaceTypeIdsWithTypes(untypedArticles: UntypedArticle[]): Observable<Article[]> {
    return this.articleTypeService.getArticleTypes()
      .pipe(
        map((articleTypes: ArticleType[]) => {

          return untypedArticles.map((article: UntypedArticle) => {
            const newArticle = {
              ...article,
              articleType: this.getArticleTypeById(articleTypes, article.articleTypeId)
            };
            delete newArticle.articleTypeId;
            return newArticle as Article;
          });

        })
      );
  }

  private getArticleTypeById(types: ArticleType[], typeId: string): ArticleType {
    return types.filter((type: ArticleType) => {
      return type.id === typeId;
    })[0];
  }
}
