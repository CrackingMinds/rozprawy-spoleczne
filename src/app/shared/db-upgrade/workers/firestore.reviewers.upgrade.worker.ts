import { Injectable, Inject } from '@angular/core';

import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';

import { sortableToOrdered } from 'app/shared/array.transformers';

import { Reviewer, Reviewers } from 'app/models/reviewer';

import { REVIEWERS_ENDPOINT } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';
import { FirestoreReviewersEndpoint } from 'app/endpoints/firestore-endpoint/reviewers/firestore.reviewers.endpoint';

import { DatabaseUpgradeWorker } from 'app/shared/db-upgrade/db.upgrade.worker';

@Injectable()
export class FirestoreReviewersUpgradeWorker implements DatabaseUpgradeWorker {

	constructor(private readonly angularFirestore: AngularFirestore,
              @Inject(REVIEWERS_ENDPOINT) private readonly reviewersEndpoint: FirestoreReviewersEndpoint) {
	}

  workerName: string = 'Reviewers Worker';

  run(): Observable<void> {
    return of(null);

    return this.reviewersEndpoint.getAllReviewers()
      .pipe(
        switchMap((reviewers: Reviewers) => {

          const batch = this.angularFirestore.firestore.batch();

          const byYears = this.groupReviewersByYears(reviewers);
          Object.keys(byYears).forEach((yearId: string) => {
            const ordered = sortableToOrdered(byYears[yearId]);
            ordered.forEach((reviewer: Reviewer) => {
              const docRef: DocumentReference = this.reviewersEndpoint.getDocument(reviewer.id).ref;
              batch.update(docRef, { nextId: reviewer.nextId });
            });
            byYears[yearId] = ordered;
          });

          console.log(byYears);

          // return from(batch.commit());
        })
      );
  }

  private groupReviewersByYears(reviewers: Reviewers): { [yearId: string]: Reviewers } {
    const byYears: { [yearId: string]: Reviewers} = {};
    reviewers.forEach((reviewer: Reviewer) => {
      if (!byYears[reviewer.yearId]) {
        byYears[reviewer.yearId] = [];
      }
      byYears[reviewer.yearId].push(reviewer);
    });
    return byYears;
  }

}
