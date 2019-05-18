import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';

import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';

import { IndexingInfo, IndexingInfoItemEntity, NewIndexingInfoItem, UpdatedIndexingInfoItem } from 'app/models/indexing';

@Injectable()
export class FirestoreIndexingInfoEndpoint extends FirestoreEndpoint<IndexingInfoItemEntity> implements IndexingInfoEndpoint {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  getIndexingInfo(): Observable<IndexingInfo> {
    return this.getCollection().snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as IndexingInfoItemEntity;
          return {
            id: a.payload.doc.id,
            ...data
          };
        })),
        take(1)
      );
  }

  postIndexingInfoItem(newIndexingInfoItem: NewIndexingInfoItem): Observable<void> {
    return from(this.getCollection().add(newIndexingInfoItem))
      .pipe(map(() => null));
  }

  updateIndexingInfoItem(updatedIndexingInfoItem: UpdatedIndexingInfoItem): Observable<void> {
    const persistedIndexingInfoItem: IndexingInfoItemEntity = {
      name: updatedIndexingInfoItem.name,
      value: updatedIndexingInfoItem.value,
      index: updatedIndexingInfoItem.index
    };
    return from(this.getDocument(updatedIndexingInfoItem.id).update(persistedIndexingInfoItem));
  }

  deleteIndexingInfoItem(indexingInfoItemId: string): Observable<void> {
    return from(this.getDocument(indexingInfoItemId).delete());
  }

  protected getCollectionName(): string {
    return "indexing";
  }

}
