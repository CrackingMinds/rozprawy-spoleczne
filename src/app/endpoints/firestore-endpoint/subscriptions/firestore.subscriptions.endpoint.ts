import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { SubscriptionInfo, SubscriptionInfoEntity, SubscriptionsInfo } from 'app/models/subscriptions';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';

import { SubscriptionsEndpoint } from 'app/endpoints/endpoint/subscriptions/subscriptions.endpoint';

@Injectable()
export class FirestoreSubscriptionsEndpoint extends FirestoreEndpoint<SubscriptionInfoEntity> implements SubscriptionsEndpoint {

	constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  getSubscriptionsInfo(): Observable<SubscriptionsInfo> {
    return this.fetchData()
      .pipe(
        take(1),
        map((data: SubscriptionsInfo) => [...data].sort((a: SubscriptionInfo, b: SubscriptionInfo) => {
          const aPrice = a.price;
          const bPrice = b.price;

          if (aPrice < bPrice) {
            return 1;
          } else if (aPrice > bPrice) {
            return -1;
          } else {
            return 0;
          }
        }))
      );
  }

  protected getCollectionName(): string {
    return 'subscriptions';
  }

}
