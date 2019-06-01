import { Injectable, Inject } from '@angular/core';

import { throwError } from 'rxjs';
import { take, catchError } from 'rxjs/operators';

import { MessagesService } from 'app/shared/messages/messages.service';

import { DATABASE_UPGRADE_WORKER, DatabaseUpgradeWorker } from 'app/shared/db-upgrade/db.upgrade.worker';

@Injectable()
export class DatabaseUpgradeService {

	constructor(private readonly messagesService: MessagesService,
              @Inject(DATABASE_UPGRADE_WORKER) private readonly upgradeWorkers: Array<DatabaseUpgradeWorker>) {}

	runUpgrade(): void {
	  this.upgradeWorkers.forEach((upgradeWorker: DatabaseUpgradeWorker) => {
	    upgradeWorker.run()
                   .pipe(
                     catchError(error => {
                       const message = `${upgradeWorker.workerName}: Unsuccessful. Error: "${error}"`;
                       // this.messagesService.show(message);
                       console.log(message);
                       return throwError(error);
                     }),
                     take(1)
                   )
                   .subscribe(() => {
                     const message = `${upgradeWorker.workerName}: Successful`;
                     // this.messagesService.show(message);
                     console.log(message);
                   });
    });
  }

}
