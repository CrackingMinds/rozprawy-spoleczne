import { ArticleType } from 'app/models/article.type';

import { Observable } from 'rxjs';

export abstract class ArticleTypeEndpoint {

  abstract getArticleTypes(): Observable<ArticleType[]>;

}
