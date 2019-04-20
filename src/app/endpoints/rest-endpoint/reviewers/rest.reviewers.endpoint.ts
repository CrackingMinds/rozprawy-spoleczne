import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { ENDPOINT_URL } from 'app/endpoints/endpoint.tokens';

import { NewReviewer, Reviewers, UpdatedReviewer } from 'app/models/reviewer';
import { ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';

@Injectable()
export class RestReviewersEndpoint extends ReviewersEndpoint {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) { super(); }

  getReviewers(): Observable<Reviewers> {
    return this.http.get<Reviewers>(this.endpointUrl + '/reviewers');
  }

  deleteReviewer(reviewerId: string): Observable<void> {
    return of(null);
  }

  postReviewer(newReviewerData: NewReviewer): Observable<void> {
    return of(null);
  }

  updateReviewer(updatedReviewerData: UpdatedReviewer): Observable<void> {
    return of(null);
  }

}
