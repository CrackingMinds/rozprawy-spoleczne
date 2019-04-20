import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import { ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';
import {
  ADD_REVIEWER,
  AddReviewerAction,
  LOAD_REVIEWERS, LoadReviewersAction,
  LoadReviewersFailAction,
  LoadReviewersSuccessAction, REMOVE_REVIEWER, RemoveReviewerAction, UPDATE_REVIEWER, UpdateReviewerAction
} from 'app/admin/pages/reviewers/store/actions/reviewers.actions';
import { Reviewers } from 'app/models/reviewer';

@Injectable()
export class ReviewersEffects {

	constructor(private actions$: Actions,
              private reviewersEndpoint: ReviewersEndpoint) {}

  @Effect()
  loadReviewers$ = this.actions$.ofType(LOAD_REVIEWERS)
    .pipe(
      switchMap((action: LoadReviewersAction) => {
        return this.reviewersEndpoint.getReviewers(action.payload.reviewerYearId)
          .pipe(
            map((reviewers: Reviewers) => new LoadReviewersSuccessAction(reviewers)),
            catchError(error => of(new LoadReviewersFailAction(error)))
          );
      })
    );

	@Effect({ dispatch: false })
  addReviewer$ = this.actions$.ofType(ADD_REVIEWER)
    .pipe(
      switchMap((action: AddReviewerAction) => {
        // @TODO: implement error handler
        return this.reviewersEndpoint.postReviewer(action.newReviewerData);
      })
    );

	@Effect({ dispatch: false })
  removeReviewer$ = this.actions$.ofType(REMOVE_REVIEWER)
    .pipe(
      switchMap((action: RemoveReviewerAction) => {
        // @TODO: implement error handler
        return this.reviewersEndpoint.deleteReviewer(action.reviewerId);
      })
    );

	@Effect({ dispatch: false })
  updateReviewer$ = this.actions$.ofType(UPDATE_REVIEWER)
    .pipe(
      switchMap((action: UpdateReviewerAction) => {
        // @TODO: implement error handler
        return this.reviewersEndpoint.updateReviewer(action.updatedReviewerData);
      })
    );

}
