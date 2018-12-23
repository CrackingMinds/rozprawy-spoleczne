import { Observable } from 'rxjs';

import { IArticle } from 'app/models/article';

export abstract class ArticlesRepository {

  abstract getArticles();
  abstract getArticles(issueId: string): Observable<IArticle[]>;

  abstract getArticlesForCurrentRoute(): Observable<IArticle[]>;

  abstract getLoading(): Observable<boolean>;

}
