import { Observable } from 'rxjs';

import { Article } from 'app/models/article';

export abstract class ArticlesRepository {

  abstract getArticles();
  abstract getArticles(issueId: string): Observable<Article[]>;

  abstract getArticlesForCurrentRoute(): Observable<Article[]>;

  abstract getLoading(): Observable<boolean>;

}
