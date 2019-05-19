import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { OrderChanges } from 'app/shared/order-utils/change/order.change';

import { IndexingInfo, NewIndexingInfoItem, UpdatedIndexingInfoItem } from 'app/models/indexing';

export const INDEXING_INFO_ENDPOINT = new InjectionToken<IndexingInfoEndpoint>('INDEXING_INFO_ENDPOINT');

export interface IndexingInfoEndpoint {

  getIndexingInfo(): Observable<IndexingInfo>;
  postIndexingInfoItem(newIndexingInfoItem: NewIndexingInfoItem): Observable<void>;
  deleteIndexingInfoItem(itemId: string, orderChanges: OrderChanges): Observable<void>;
  updateIndexingInfoItem(updatedIndexingInfoItem: UpdatedIndexingInfoItem): Observable<void>;

  changeOrder(orderChanges: OrderChanges): Observable<void>;

}
