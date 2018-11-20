import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IArticleType } from 'app/models/article.type';

import { FirestoreArticleTypeService } from 'app/services/crud/firestore/article.types.service';

@Injectable()
export class ArticleTypesService {

  constructor(private firestoreArticleTypeService: FirestoreArticleTypeService) {}

  getArticleTypes(): Observable<IArticleType[]> {
    return this.firestoreArticleTypeService.getArticleTypes();
  }

}
