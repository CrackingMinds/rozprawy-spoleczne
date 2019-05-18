import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return this.getCollection().doc(id).valueChanges()
                                 .pipe(
                                   map((articleType: IFirestoreArticleType) => {
                                     return {
                                       id: id,
                                       ...articleType
                                     };
                                   })
                                 );
  }

  getArticleTypes(): Observable<ArticleType[]> {
    return this.getCollection().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data() as IFirestoreArticleType;
        return {
          id: a.payload.doc.id,
          ...data
        };
      }))
    );
  }

  protected getCollectionName(): string {
    return "article-types";
  }

}
