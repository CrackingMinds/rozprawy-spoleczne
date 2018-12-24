import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ENDPOINT_URL } from 'app/endpoints/endpoint.tokens';

import { ISubsriptionsInfo } from 'app/models/subscriptions';
import { SubscriptionsEndpoint } from 'app/endpoints/endpoint/subscriptions/subscriptions.endpoint';

@Injectable()
export class RestSubscriptionsEndpoint extends SubscriptionsEndpoint {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) { super(); }

  getSubscriptionsInfo(): Observable<ISubsriptionsInfo> {
    return this.http.get<ISubsriptionsInfo>(this.endpointUrl + '/subscriptions');
  }

}
