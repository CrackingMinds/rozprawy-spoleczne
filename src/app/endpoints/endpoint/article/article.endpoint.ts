import { Observable } from 'rxjs';

import { Article, ArticleEntity } from 'app/models/article';

export abstract class ArticleEndpoint {

  abstract getIssueArticles(issueId: string): Observable<Article[]>;
  abstract getArticle(articleId: string): Observable<Article>;
  abstract postArticle(rawArticle: ArticleEntity): Observable<void>;
  abstract deleteArticle(articleId: string): Observable<void>;

}
