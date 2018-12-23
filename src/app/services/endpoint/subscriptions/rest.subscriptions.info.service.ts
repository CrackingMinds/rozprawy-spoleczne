import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ENDPOINT_URL } from 'app/services/endpoint/endpoint.services.tokens';

import { ISubsriptionsInfo } from 'app/models/subscriptions';
import { SubscriptionsInfoService } from 'app/services/endpoint/subscriptions/subscriptions.info.service';

@Injectable()
export class RestSubscriptionsInfoService extends SubscriptionsInfoService {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) {
    super();
  }

  fetchSubscriptionsInfo(): Observable<ISubsriptionsInfo> {
    return this.http.get<ISubsriptionsInfo>(this.endpointUrl + '/subscriptions');
  }

}
