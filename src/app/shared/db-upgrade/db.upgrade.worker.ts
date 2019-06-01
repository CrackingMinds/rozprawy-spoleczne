import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

export const DATABASE_UPGRADE_WORKER: InjectionToken<DatabaseUpgradeWorker> = new InjectionToken<DatabaseUpgradeWorker>('DATABASE_UPGRADE_WORKER');

export interface DatabaseUpgradeWorker {

  workerName: string;

  run(): Observable<void>;

}
