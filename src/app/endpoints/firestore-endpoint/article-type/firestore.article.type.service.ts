import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';

import { ArticleType } from 'app/models/article.type';

interface IFirestoreArticleType {
  namePl: string;
}

@Injectable()
export class FirestoreArticleTypeService extends FirestoreEndpoint<IFirestoreArticleType> {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  getArticleType(id: string): Observable<ArticleType> {
    return this.fetchOne(id);
  }

  getArticleTypes(): Observable<ArticleType[]> {
    return this.fetchData();
  }

  protected getCollectionName(): string {
    return 'article-types';
  }

}
