import { Observable } from 'rxjs';

import { IArticle, RawArticleWithTypeId } from 'app/models/article';

export interface ArticleService {

  getArticles(issueId: string): Observable<IArticle[]>;
  postArticle(article: RawArticleWithTypeId): Observable<void>;

}
