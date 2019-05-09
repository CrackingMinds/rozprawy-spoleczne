import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';

import { IndexingInfo, IndexingInfoItemEntity, NewIndexingInfoItem, UpdatedIndexingInfoItem } from 'app/models/indexing';

@Injectable()
export class FirestoreIndexingInfoEndpoint extends IndexingInfoEndpoint {

  private static collectionName: string = 'indexing';

  constructor(private angularFirestore: AngularFirestore) { super(); }

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

  private getCollection(): AngularFirestoreCollection<IndexingInfoItemEntity> {
    return this.angularFirestore.collection<IndexingInfoItemEntity>(FirestoreIndexingInfoEndpoint.collectionName);
  }

  private getDocument(id: string): AngularFirestoreDocument<IndexingInfoItemEntity> {
    return this.angularFirestore.doc(`${FirestoreIndexingInfoEndpoint.collectionName}/${id}`);
  }

}
