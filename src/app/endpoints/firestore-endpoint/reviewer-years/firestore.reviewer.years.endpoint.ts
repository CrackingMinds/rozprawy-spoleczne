import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { ReviewerYearsEndpoint } from 'app/endpoints/endpoint/reviewer-years/reviewer.years.endpoint';
import { NewReviewerYear, ReviewerYearEntity, ReviewerYears, UpdatedReviewerYear } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';

@Injectable()
export class FirestoreReviewerYearsEndpoint extends ReviewerYearsEndpoint {

  private static readonly collectionName: string = 'reviewer-years';

  constructor(private angularFirestore: AngularFirestore) { super(); }

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
    const reviewerYearDocToBeDeleted = this.getDocById(reviewerYearId);
    return from(reviewerYearDocToBeDeleted.delete());
  }

  updateReviewerYear(updatedReviewerYear: UpdatedReviewerYear): Observable<void> {
    const persistedReviewerYear: ReviewerYearEntity = {
      value: updatedReviewerYear.value
    };

    const reviewerYearDocToBeUpdated = this.getDocById(updatedReviewerYear.id);
    return from(reviewerYearDocToBeUpdated.update(persistedReviewerYear));
  }

  private getCollection(): AngularFirestoreCollection {
    return this.angularFirestore.collection<ReviewerYearEntity>(FirestoreReviewerYearsEndpoint.collectionName);
  }

  private getDocById(reviewerYearId: string): AngularFirestoreDocument<ReviewerYearEntity> {
    return this.angularFirestore.doc(`${FirestoreReviewerYearsEndpoint.collectionName}/${reviewerYearId}`);
  }

}
