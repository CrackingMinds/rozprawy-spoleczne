import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ENDPOINT_URL } from 'app/endpoints/endpoint.tokens';

import { IReviewer } from 'app/models/reviewer';
import { ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';

@Injectable()
export class RestReviewersEndpoint extends ReviewersEndpoint {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) { super(); }

  getReviewers(): Observable<IReviewer[]> {
    return this.http.get<IReviewer[]>(this.endpointUrl + '/reviewers');
  }

}
