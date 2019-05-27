import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { DocumentReference, QueryFn } from 'angularfire2/firestore';

import { Ordered } from 'app/shared/order-utils/ordered';
import { OrderedItemsSorter } from 'app/shared/order-utils/sort/ordered.items.sorter';
import { OrderChange, OrderChanges } from 'app/shared/order-utils/change/order.change';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';

export abstract class OrderedFirestoreEndpoint<T extends Ordered> extends FirestoreEndpoint<T> {

  fetchData(queryFn?: QueryFn): Observable<Array<T & { id: string }>> {
    return super.fetchData(queryFn)
      .pipe(
        map(data => OrderedItemsSorter.sort(data))
      );
  }

  changeOrder(orderChanges: OrderChanges): Observable<void> {
    const batch = this.angularFirestore.firestore.batch();

    orderChanges.changes.forEach((change: OrderChange) => {
      const docRef: DocumentReference = this.getDocument(change.itemId).ref;
      batch.update(docRef, { nextId: change.nextId });
    });

    return from(batch.commit());
  }

  deleteOrderedItem(itemId: string, orderChanges: OrderChanges): Observable<void> {
    const batch = this.angularFirestore.firestore.batch();

    orderChanges.changes.forEach((change: OrderChange) => {
      const docRef: DocumentReference = this.getDocument(change.itemId).ref;
      batch.update(docRef, { nextId: change.nextId });
    });

    batch.delete(this.getDocument(itemId).ref);

    return from(batch.commit());
  }

}
