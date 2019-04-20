import { Observable } from 'rxjs';

import { NewReviewerYear, ReviewerYears, UpdatedReviewerYear } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';

export abstract class ReviewerYearsEndpoint {

  abstract getReviewerYears(): Observable<ReviewerYears>;
  abstract postReviewerYear(newReviewerYear: NewReviewerYear): Observable<void>;
  abstract deleteReviewerYear(reviewerYearId: string): Observable<void>;
  abstract updateReviewerYear(updatedReviewerYear: UpdatedReviewerYear): Observable<void>;

}
