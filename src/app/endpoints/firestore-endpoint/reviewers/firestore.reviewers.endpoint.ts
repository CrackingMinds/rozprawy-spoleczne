import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AngularFirestore, QueryFn } from 'angularfire2/firestore';

import { OrderedFirestoreEndpoint } from 'app/endpoints/firestore-endpoint/ordered.firestore.endpoint';

import { OrderChanges } from 'app/shared/order-utils/change/order.change';

import { ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';

import { NewReviewer, ReviewerEntity, Reviewers, UpdatedReviewer } from 'app/models/reviewer';

@Injectable()
export class FirestoreReviewersEndpoint extends OrderedFirestoreEndpoint<ReviewerEntity> implements ReviewersEndpoint {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  getReviewers(reviewerYearId: string): Observable<Reviewers> {
    const queryFn: QueryFn = ref => ref.where('yearId', '==', reviewerYearId);
    return this.fetchData(queryFn)
      .pipe(take(1));
  }

  postReviewer(newReviewerData: NewReviewer): Observable<void> {
    return this.addDocument(newReviewerData);
  }

  updateReviewer(updatedReviewerData: UpdatedReviewer): Observable<void> {
    return this.updateDocument(updatedReviewerData.id, {
      person: updatedReviewerData.person,
      title: updatedReviewerData.title,
      yearId: updatedReviewerData.yearId,
      additionalInfo: updatedReviewerData.additionalInfo
    });
  }

  deleteReviewer(reviewerId: string, orderChanges: OrderChanges): Observable<void> {
    return this.deleteOrderedItem(reviewerId, orderChanges);
  }

  protected getCollectionName(): string {
    return 'reviewers';
  }

}
