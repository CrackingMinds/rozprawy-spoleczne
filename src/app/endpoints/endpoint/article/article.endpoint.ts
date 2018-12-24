import { Observable } from 'rxjs';

import { Article, RawArticle } from 'app/models/article';

export abstract class ArticleEndpoint {

  abstract getIssueArticles(issueId: string): Observable<Article[]>;
  abstract getArticle(articleId: string): Observable<Article>;
  abstract postArticle(rawArticle: RawArticle): Observable<void>;

}
