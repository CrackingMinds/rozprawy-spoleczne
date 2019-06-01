import { Injectable, Inject } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';

import { sortableToOrdered } from 'app/shared/array.transformers';

import { Ordered } from 'app/shared/order-utils/ordered';
import { SortableWithId } from 'app/models/sortable';

import { ScientificBoard } from 'app/models/scientific.board';

import { SCIENTIFIC_BOARD_ENDPOINT } from 'app/endpoints/endpoint/scientific-board/scientific.board.endpoint';
import { FirestoreScientificBoardEndpoint } from 'app/endpoints/firestore-endpoint/scientific-board/firestore.scientific.board.endpoint';

import { DatabaseUpgradeWorker } from 'app/shared/db-upgrade/db.upgrade.worker';

@Injectable()
export class FirestoreScientificBoardUpgradeWorker implements DatabaseUpgradeWorker {

	constructor(private readonly angularFirestore: AngularFirestore,
              @Inject(SCIENTIFIC_BOARD_ENDPOINT) private readonly scientificBoardEndpoint: FirestoreScientificBoardEndpoint) {
	}

  workerName: string = 'Scientific Board Worker';

  run(): Observable<void> {
    return of(null);

    return this.scientificBoardEndpoint.getScientificBoard()
      .pipe(
        switchMap((scientificBoard: ScientificBoard) => {
          const batch = this.angularFirestore.firestore.batch();

          const ordered = sortableToOrdered(scientificBoard as undefined as Array<SortableWithId>);
          console.log(ordered);
          ordered.forEach((boardMember: SortableWithId & Ordered) => {
            const docRef: DocumentReference = this.scientificBoardEndpoint.getDocument(boardMember.id).ref;
            batch.update(docRef, { nextId: boardMember.nextId });
          });

          return of(null);
          // return from(batch.commit());
        })
      );
  }


}
