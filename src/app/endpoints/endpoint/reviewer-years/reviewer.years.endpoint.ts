import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { NewReviewerYear, ReviewerYears, UpdatedReviewerYear } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';
import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';

export const REVIEWER_YEARS_ENDPOINT = new InjectionToken<IndexingInfoEndpoint>('REVIEWER_YEARS_ENDPOINT');

export interface ReviewerYearsEndpoint {

  getReviewerYears(): Observable<ReviewerYears>;
  postReviewerYear(newReviewerYear: NewReviewerYear): Observable<void>;
  deleteReviewerYear(reviewerYearId: string): Observable<void>;
  updateReviewerYear(updatedReviewerYear: UpdatedReviewerYear): Observable<void>;

}
