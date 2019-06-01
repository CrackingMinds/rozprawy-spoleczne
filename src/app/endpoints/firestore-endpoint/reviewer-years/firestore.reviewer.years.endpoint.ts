import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';

import { ReviewerYearsEndpoint } from 'app/endpoints/endpoint/reviewer-years/reviewer.years.endpoint';
import { NewReviewerYear, ReviewerYearEntity, ReviewerYears, UpdatedReviewerYear } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';

@Injectable()
export class FirestoreReviewerYearsEndpoint extends FirestoreEndpoint<ReviewerYearEntity> implements ReviewerYearsEndpoint {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  getReviewerYears(): Observable<ReviewerYears> {
    return this.fetchData();
  }

  postReviewerYear(newReviewerYear: NewReviewerYear): Observable<void> {
    return this.addDocument(newReviewerYear);
  }

  deleteReviewerYear(reviewerYearId: string): Observable<void> {
    return this.deleteDocument(reviewerYearId);
  }

  updateReviewerYear(updatedReviewerYear: UpdatedReviewerYear): Observable<void> {
    return this.updateDocument(updatedReviewerYear.id, {
      value: updatedReviewerYear.value
    });
  }

  protected getCollectionName(): string {
    return "reviewer-years";
  }

}
