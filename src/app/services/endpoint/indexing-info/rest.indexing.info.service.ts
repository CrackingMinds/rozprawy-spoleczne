import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ENDPOINT_URL } from 'app/services/endpoint/endpoint.services.tokens';

import { IIndexingInfo } from 'app/models/indexing-info';
import { IndexingInfoService } from 'app/services/endpoint/indexing-info/indexing.info.service';

@Injectable()
export class RestIndexingInfoService extends IndexingInfoService {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) {
    super();
  }

  fetchIndexingInfo(): Observable<IIndexingInfo[]> {
    return this.http.get<IIndexingInfo[]>(this.endpointUrl + '/indexing');
  }

}
