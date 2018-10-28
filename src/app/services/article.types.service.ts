import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IArticleType } from 'app/models/article.type';
import { FArticleType } from 'app/models/firestore/f.article.type';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ArticleTypesService {

  private static collectionName: string = 'article-types';

  constructor(private angularFirestore: AngularFirestore) {}

  getArticleType(id: string): Observable<IArticleType> {
    let articleTypesCollection = this.angularFirestore.collection<FArticleType>(ArticleTypesService.collectionName);
    return articleTypesCollection.doc(id).valueChanges()
                                 .pipe(
                                   map((articleType: FArticleType) => {
                                     return {
                                       id: id,
                                       data: articleType
                                     };
                                   })
                                 );
  }

  getArticleTypes(): Observable<IArticleType[]> {
    let articleTypesCollection = this.angularFirestore.collection<FArticleType>(ArticleTypesService.collectionName);
    return articleTypesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data() as FArticleType;
        return {
          id: a.payload.doc.id,
          data: data
        };
      }))
    );
  }

}
