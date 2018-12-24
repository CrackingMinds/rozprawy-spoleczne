import { Observable } from 'rxjs';

import { ISubsriptionsInfo } from 'app/models/subscriptions';

export abstract class SubscriptionsEndpoint {

  abstract getSubscriptionsInfo(): Observable<ISubsriptionsInfo>;

}
