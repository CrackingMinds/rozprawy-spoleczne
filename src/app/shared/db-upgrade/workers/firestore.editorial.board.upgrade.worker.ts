import { Injectable, Inject } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';

import { sortableToOrdered } from 'app/shared/array.transformers';

import { EditorialBoard } from 'app/models/editorial.board';
import { EditorialBoardMember } from 'app/models/editorial-board-member';

import { EDITORIAL_BOARD_ENDPOINT } from 'app/endpoints/endpoint/editorial-board/editorial.board.endpoint';
import { FirestoreEditorialBoardEndpoint } from 'app/endpoints/firestore-endpoint/editorial-board/firestore.editorial.board.endpoint';

import { DatabaseUpgradeWorker } from 'app/shared/db-upgrade/db.upgrade.worker';

@Injectable()
export class FirestoreEditorialBoardUpgradeWorker implements DatabaseUpgradeWorker {

	constructor(private readonly angularFirestore: AngularFirestore,
              @Inject(EDITORIAL_BOARD_ENDPOINT) private readonly editorialBoardEndpoint: FirestoreEditorialBoardEndpoint) {
	}

  workerName: string = 'Editorial Board Worker';

  run(): Observable<void> {
    return of(null);

    return this.editorialBoardEndpoint.getEditorialBoard()
      .pipe(
        switchMap((editorialBoard: EditorialBoard) => {
          const batch = this.angularFirestore.firestore.batch();

          const ordered = sortableToOrdered(editorialBoard);
          console.log(ordered);
          ordered.forEach((boardMember: EditorialBoardMember) => {
            const docRef: DocumentReference = this.editorialBoardEndpoint.getDocument(boardMember.id).ref;
            batch.update(docRef, { nextId: boardMember.nextId });
          });

          // return from(batch.commit());
        })
      );
  }

}
