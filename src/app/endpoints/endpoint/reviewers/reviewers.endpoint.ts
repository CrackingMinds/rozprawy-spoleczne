import { Observable } from 'rxjs';

import { IReviewer } from 'app/models/reviewer';

export abstract class ReviewersEndpoint {

  abstract getReviewers(): Observable<IReviewer[]>;

}
