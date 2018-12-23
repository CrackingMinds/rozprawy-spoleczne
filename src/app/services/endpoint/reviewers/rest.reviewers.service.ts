import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ENDPOINT_URL } from 'app/services/endpoint/endpoint.services.tokens';

import { IReviewer } from 'app/models/reviewer';
import { ReviewersService } from 'app/services/endpoint/reviewers/reviewers.service';

@Injectable()
export class RestReviewersService extends ReviewersService {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) {
    super();
  }

  fetchReviewers(): Observable<IReviewer[]> {
    return this.http.get<IReviewer[]>(this.endpointUrl + '/reviewers');
  }

}
