import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';

import { ReviewerYearsEndpoint } from 'app/endpoints/endpoint/reviewer-years/reviewer.years.endpoint';
import { NewReviewerYear, ReviewerYearEntity, ReviewerYears, UpdatedReviewerYear } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';

@Injectable()
export class FirestoreReviewerYearsEndpoint extends FirestoreEndpoint<ReviewerYearEntity> implements ReviewerYearsEndpoint {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  getReviewerYears(): Observable<ReviewerYears> {
    return this.getCollection().snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as ReviewerYearEntity;
          return {
            id: a.payload.doc.id,
            ...data
          };
        })),
        take(1)
      );
  }

  postReviewerYear(newReviewerYear: NewReviewerYear): Observable<void> {
    return from(this.getCollection().add(newReviewerYear))
      .pipe(map(() => null));
  }

  deleteReviewerYear(reviewerYearId: string): Observable<void> {
    return from(this.getDocument(reviewerYearId).delete());
  }

  updateReviewerYear(updatedReviewerYear: UpdatedReviewerYear): Observable<void> {
    const persistedReviewerYear: ReviewerYearEntity = {
      value: updatedReviewerYear.value
    };
    return from(this.getDocument(updatedReviewerYear.id).update(persistedReviewerYear));
  }

  protected getCollectionName(): string {
    return "reviewer-years";
  }

}
