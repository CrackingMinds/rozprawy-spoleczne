import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { OrderedFirestoreEndpoint } from 'app/endpoints/firestore-endpoint/ordered.firestore.endpoint';

import { OrderChanges } from 'app/shared/order-utils/change/order.change';

import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';

import { IndexingInfo, IndexingInfoItemEntity, NewIndexingInfoItem, UpdatedIndexingInfoItem } from 'app/models/indexing';

@Injectable()
export class FirestoreIndexingInfoEndpoint extends OrderedFirestoreEndpoint<IndexingInfoItemEntity> implements IndexingInfoEndpoint {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  getIndexingInfo(): Observable<IndexingInfo> {
    return this.fetchData()
      .pipe(take(1));
  }

  postIndexingInfoItem(newIndexingInfoItem: NewIndexingInfoItem): Observable<void> {
    return this.addDocument(newIndexingInfoItem);
  }

  updateIndexingInfoItem(updatedIndexingInfoItem: UpdatedIndexingInfoItem): Observable<void> {
    return this.updateDocument(updatedIndexingInfoItem.id, {
      name: updatedIndexingInfoItem.name,
      value: updatedIndexingInfoItem.value
    });
  }

  deleteIndexingInfoItem(itemId: string, orderChanges: OrderChanges): Observable<void> {
    return this.deleteOrderedItem(itemId, orderChanges);
  }

  protected getCollectionName(): string {
    return 'indexing';
  }

}
