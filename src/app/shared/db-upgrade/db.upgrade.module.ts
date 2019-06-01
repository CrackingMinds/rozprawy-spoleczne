import { NgModule } from '@angular/core';

import { DatabaseUpgradeService } from 'app/shared/db-upgrade/db.upgrade.service';

import { DATABASE_UPGRADE_WORKER } from 'app/shared/db-upgrade/db.upgrade.worker';

import { FirestoreEditorialBoardUpgradeWorker } from 'app/shared/db-upgrade/workers/firestore.editorial.board.upgrade.worker';
import { FirestoreReviewersUpgradeWorker } from 'app/shared/db-upgrade/workers/firestore.reviewers.upgrade.worker';

@NgModule({
	providers: [
    DatabaseUpgradeService,
    {
      provide: DATABASE_UPGRADE_WORKER,
      useClass: FirestoreEditorialBoardUpgradeWorker,
      multi: true
    },
    {
      provide: DATABASE_UPGRADE_WORKER,
      useClass: FirestoreReviewersUpgradeWorker,
      multi: true
    }
	]
})
export class DatabaseUpgradeModule {

  constructor(dbUpgradeService: DatabaseUpgradeService) {
    dbUpgradeService.runUpgrade();
  }

}
