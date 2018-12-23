import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { IArticleType } from 'app/models/article.type';
import { ArticleTypeService } from 'app/services/endpoint/article-type/article.type.service';

interface IFirestoreArticleType {
  namePl: string;
}

@Injectable()
export class FirestoreArticleTypeService implements ArticleTypeService {

  private static collectionName: string = 'article-types';

  constructor(private angularFirestore: AngularFirestore) {}

  getArticleType(id: string): Observable<IArticleType> {
    let articleTypesCollection = this.angularFirestore.collection<IFirestoreArticleType>(FirestoreArticleTypeService.collectionName);
    return articleTypesCollection.doc(id).valueChanges()
                                 .pipe(
                                   map((articleType: IFirestoreArticleType) => {
                                     return {
                                       id: id,
                                       ...articleType
                                     };
                                   })
                                 );
  }

  getArticleTypes(): Observable<IArticleType[]> {
    let articleTypesCollection = this.angularFirestore.collection<IFirestoreArticleType>(FirestoreArticleTypeService.collectionName);
    return articleTypesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data() as IFirestoreArticleType;
        return {
          id: a.payload.doc.id,
          ...data
        };
      }))
    );
  }
}
