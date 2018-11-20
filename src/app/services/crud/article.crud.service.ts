import { Observable } from 'rxjs';

import { IArticle, RawArticleWithTypeId } from 'app/models/article';

export interface ArticleCrudService {

  getArticlesInIssue(issueId: string): Observable<IArticle[]>;
  postArticle(article: RawArticleWithTypeId): Observable<void>;

}
