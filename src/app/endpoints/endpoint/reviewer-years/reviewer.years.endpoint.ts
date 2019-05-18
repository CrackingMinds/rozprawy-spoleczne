import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { NewReviewerYear, ReviewerYears, UpdatedReviewerYear } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';

export const REVIEWER_YEARS_ENDPOINT = new InjectionToken<ReviewerYearsEndpoint>('REVIEWER_YEARS_ENDPOINT');

export interface ReviewerYearsEndpoint {

  getReviewerYears(): Observable<ReviewerYears>;
  postReviewerYear(newReviewerYear: NewReviewerYear): Observable<void>;
  deleteReviewerYear(reviewerYearId: string): Observable<void>;
  updateReviewerYear(updatedReviewerYear: UpdatedReviewerYear): Observable<void>;

}
