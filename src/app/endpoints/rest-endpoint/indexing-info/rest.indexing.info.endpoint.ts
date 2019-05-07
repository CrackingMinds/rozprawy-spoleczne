import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { ENDPOINT_URL } from 'app/endpoints/endpoint.tokens';

import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';
import { IndexingInfo, NewIndexingInfoItem, UpdatedIndexingInfoItem } from 'app/models/indexing';

@Injectable()
export class RestIndexingInfoEndpoint extends IndexingInfoEndpoint {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) { super(); }

  getIndexingInfo(): Observable<IndexingInfo> {
    return this.http.get<IndexingInfo>(this.endpointUrl + '/indexing');
  }

  deleteIndexingInfoItem(indexingInfoItemId: string): Observable<void> {
    return of(null);
  }

  postIndexingInfoItem(newIndexingInfoItem: NewIndexingInfoItem): Observable<void> {
    return of(null);
  }

  updateIndexingInfoItem(updatedIndexingInfoItem: UpdatedIndexingInfoItem): Observable<void> {
    return of(null);
  }

}
