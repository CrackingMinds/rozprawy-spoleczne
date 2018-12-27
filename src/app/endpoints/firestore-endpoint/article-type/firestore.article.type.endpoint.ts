import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ArticleTypeEndpoint } from 'app/endpoints/endpoint/article-type/article.type.endpoint';
import { ArticleType } from 'app/models/article.type';
import { FirestoreArticleTypeService } from 'app/endpoints/firestore-endpoint/article-type/firestore.article.type.service';

@Injectable()
export class FirestoreArticleTypeEndpoint extends ArticleTypeEndpoint {

  constructor(private articleTypeService: FirestoreArticleTypeService) { super(); }

  getArticleTypes(): Observable<ArticleType[]> {
    return this.articleTypeService.getArticleTypes();
  }

}
