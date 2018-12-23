import { IArticleType } from 'app/models/article.type';

import { Observable } from 'rxjs';

export interface ArticleTypeService {

  getArticleType(id: string): Observable<IArticleType>;
  getArticleTypes(): Observable<IArticleType[]>;

}
