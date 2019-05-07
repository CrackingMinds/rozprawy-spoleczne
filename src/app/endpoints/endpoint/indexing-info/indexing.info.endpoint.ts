import { Observable } from 'rxjs';

import { IndexingInfo, NewIndexingInfoItem, UpdatedIndexingInfoItem } from 'app/models/indexing';

export abstract class IndexingInfoEndpoint {

  abstract getIndexingInfo(): Observable<IndexingInfo>;
  abstract postIndexingInfoItem(newIndexingInfoItem: NewIndexingInfoItem): Observable<void>;
  abstract deleteIndexingInfoItem(indexingInfoItemId: string): Observable<void>;
  abstract updateIndexingInfoItem(updatedIndexingInfoItem: UpdatedIndexingInfoItem): Observable<void>;

}
