import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { NewReviewer, Reviewers, UpdatedReviewer } from 'app/models/reviewer';

export const REVIEWERS_ENDPOINT = new InjectionToken<ReviewersEndpoint>('REVIEWERS_ENDPOINT');

export interface ReviewersEndpoint {

  getReviewers(reviewerYearId: string): Observable<Reviewers>;
  postReviewer(newReviewerData: NewReviewer): Observable<void>;
  deleteReviewer(reviewerId: string): Observable<void>;
  updateReviewer(updatedReviewerData: UpdatedReviewer): Observable<void>;

}
