import { Observable } from 'rxjs';

import { ISubsriptionsInfo } from 'app/models/subscriptions';

export abstract class SubscriptionsInfoService {

    abstract fetchSubscriptionsInfo(): Observable<ISubsriptionsInfo>;

}
