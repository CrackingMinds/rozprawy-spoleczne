import { Observable } from 'rxjs';

import { NewReviewer, Reviewers, UpdatedReviewer } from 'app/models/reviewer';

export abstract class ReviewersEndpoint {

  abstract getReviewers(reviewerYearId: string): Observable<Reviewers>;
  abstract postReviewer(newReviewerData: NewReviewer): Observable<void>;
  abstract deleteReviewer(reviewerId: string): Observable<void>;
  abstract updateReviewer(updatedReviewerData: UpdatedReviewer): Observable<void>;

}
