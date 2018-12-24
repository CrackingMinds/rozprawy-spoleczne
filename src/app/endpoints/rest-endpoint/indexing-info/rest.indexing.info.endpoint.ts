import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ENDPOINT_URL } from 'app/endpoints/endpoint.tokens';

import { IIndexingInfo } from 'app/models/indexing-info';
import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';

@Injectable()
export class RestIndexingInfoEndpoint extends IndexingInfoEndpoint {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) { super(); }

  getIndexingInfo(): Observable<IIndexingInfo[]> {
    return this.http.get<IIndexingInfo[]>(this.endpointUrl + '/indexing');
  }

}
