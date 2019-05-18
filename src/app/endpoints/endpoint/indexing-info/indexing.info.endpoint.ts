import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { IndexingInfo, NewIndexingInfoItem, UpdatedIndexingInfoItem } from 'app/models/indexing';

export const INDEXING_INFO_ENDPOINT = new InjectionToken<IndexingInfoEndpoint>('INDEXING_INFO_ENDPOINT');

export interface IndexingInfoEndpoint {

  getIndexingInfo(): Observable<IndexingInfo>;
  postIndexingInfoItem(newIndexingInfoItem: NewIndexingInfoItem): Observable<void>;
  deleteIndexingInfoItem(indexingInfoItemId: string): Observable<void>;
  updateIndexingInfoItem(updatedIndexingInfoItem: UpdatedIndexingInfoItem): Observable<void>;

}
