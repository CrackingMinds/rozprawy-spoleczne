import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';

import { ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';
import { NewReviewer, ReviewerEntity, Reviewers, UpdatedReviewer } from 'app/models/reviewer';

@Injectable()
export class FirestoreReviewersEndpoint extends ReviewersEndpoint {

  private static readonly collectionName: string = 'reviewers';

  constructor(private angularFirestore: AngularFirestore) { super(); }

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
        }))
      );
  }

  postReviewer(newReviewerData: NewReviewer): Observable<void> {
    return from(this.getCollection().add(newReviewerData))
      .pipe(map(() => null));
  }

  deleteReviewer(reviewerId: string): Observable<void> {
    const reviewerDocToBeDeleted: AngularFirestoreDocument<ReviewerEntity> = this.angularFirestore.doc(`${FirestoreReviewersEndpoint.collectionName}/${reviewerId}`);
    return from(reviewerDocToBeDeleted.delete());
  }

  updateReviewer(updatedReviewerData: UpdatedReviewer): Observable<void> {
    const persistedReviewer: ReviewerEntity = {
      person: updatedReviewerData.person,
      title: updatedReviewerData.title,
      yearId: updatedReviewerData.yearId,
      additionalInfo: updatedReviewerData.additionalInfo,
      index: updatedReviewerData.index
    };

    const reviewerDocToBeUpdated: AngularFirestoreDocument<ReviewerEntity> = this.angularFirestore.doc(`${FirestoreReviewersEndpoint.collectionName}/${updatedReviewerData.id}`);
    return from(reviewerDocToBeUpdated.update(persistedReviewer));
  }

  private getCollection(queryFn?: QueryFn): AngularFirestoreCollection {
    return this.angularFirestore.collection<ReviewerEntity>(FirestoreReviewersEndpoint.collectionName, queryFn);
  }

}
