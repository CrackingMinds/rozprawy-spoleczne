import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { SubscriptionsInfo } from 'app/models/subscriptions';

export const SUBSCRIPTIONS_ENDPOINT = new InjectionToken<SubscriptionsEndpoint>('SUBSCRIPTIONS_ENDPOINT');

export interface SubscriptionsEndpoint {

  getSubscriptionsInfo(): Observable<SubscriptionsInfo>;

}
