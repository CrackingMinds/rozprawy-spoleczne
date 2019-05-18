import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestore, QueryFn } from 'angularfire2/firestore';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';

import { ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';
import { NewReviewer, ReviewerEntity, Reviewers, UpdatedReviewer } from 'app/models/reviewer';

@Injectable()
export class FirestoreReviewersEndpoint extends FirestoreEndpoint<ReviewerEntity> implements ReviewersEndpoint {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  getReviewers(reviewerYearId: string): Observable<Reviewers> {
    const queryFn: QueryFn = ref => ref.where('yearId', '==', reviewerYearId);
    return this.getCollection(queryFn).snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as ReviewerEntity;
          return {
            id: a.payload.doc.id,
            ...data
          };
        })),
        take(1)
      );
  }

  postReviewer(newReviewerData: NewReviewer): Observable<void> {
    return from(this.getCollection().add(newReviewerData))
      .pipe(map(() => null));
  }

  deleteReviewer(reviewerId: string): Observable<void> {
    return from(this.getDocument(reviewerId).delete());
  }

  updateReviewer(updatedReviewerData: UpdatedReviewer): Observable<void> {
    const persistedReviewer: ReviewerEntity = {
      person: updatedReviewerData.person,
      title: updatedReviewerData.title,
      yearId: updatedReviewerData.yearId,
      additionalInfo: updatedReviewerData.additionalInfo,
      index: updatedReviewerData.index
    };
    return from(this.getDocument(updatedReviewerData.id).update(persistedReviewer));
  }

  protected getCollectionName(): string {
    return "reviewers";
  }

}
