import { Observable } from 'rxjs';

import { IReviewer } from 'app/models/reviewer';

export abstract class ReviewersService {

    abstract fetchReviewers(): Observable<IReviewer[]>;

}
