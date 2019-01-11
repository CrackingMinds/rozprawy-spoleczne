import { Observable } from 'rxjs';

import { Article, ArticleEntity, UntypedArticle } from 'app/models/article';

export abstract class ArticleEndpoint {

  abstract getIssueArticles(issueId: string): Observable<Article[]>;
  abstract getArticle(articleId: string): Observable<Article>;
  abstract postArticle(rawArticle: ArticleEntity): Observable<void>;
  abstract updateArticle(updatedArticle: UntypedArticle): Observable<void>;
  abstract deleteArticle(article: Article): Observable<void>;

}
