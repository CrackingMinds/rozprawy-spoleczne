import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { Article, ArticleEntity, UntypedArticle } from 'app/models/article';

export const ARTICLE_ENDPOINT = new InjectionToken<ArticleEndpoint>('ARTICLE_ENDPOINT');

export interface ArticleEndpoint {

  getIssueArticles(issueId: string): Observable<Article[]>;
  getArticle(articleId: string): Observable<Article>;
  postArticle(rawArticle: ArticleEntity): Observable<void>;
  updateArticle(updatedArticle: UntypedArticle): Observable<void>;
  deleteArticle(article: Article): Observable<void>;

}
