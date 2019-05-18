import { Injectable, Inject } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import {
  ADD_REVIEWER,
  AddReviewerAction,
  LOAD_REVIEWERS, LoadReviewersAction,
  LoadReviewersFailAction,
  LoadReviewersSuccessAction, REMOVE_REVIEWER, RemoveReviewerAction, UPDATE_REVIEWER, UpdateReviewerAction,
  ENDPOINT_CALL_FAIL, EndpointCallFailAction
} from 'app/admin/pages/reviewers/store/actions/reviewers.actions';

import { EndpointErrorHandler } from 'app/endpoints/endpoint.error.handler';

import { REVIEWERS_ENDPOINT, ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';

import { Reviewers } from 'app/models/reviewer';

@Injectable()
export class ReviewersEffects {

	constructor(private readonly actions$: Actions,
              @Inject(REVIEWERS_ENDPOINT) private readonly reviewersEndpoint: ReviewersEndpoint,
              private readonly endpointErrorHandler: EndpointErrorHandler) {}

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

	@Effect()
  addReviewer$ = this.actions$.ofType(ADD_REVIEWER)
    .pipe(
      switchMap((action: AddReviewerAction) => {
        return this.reviewersEndpoint.postReviewer(action.newReviewerData)
          .pipe(
            map(() => new LoadReviewersAction({ reviewerYearId: action.newReviewerData.yearId })),
            catchError(error => of(new EndpointCallFailAction(error)))
          );
      })
    );

	@Effect()
  removeReviewer$ = this.actions$.ofType(REMOVE_REVIEWER)
    .pipe(
      switchMap((action: RemoveReviewerAction) => {
        return this.reviewersEndpoint.deleteReviewer(action.payload.reviewerId)
          .pipe(
            map(() => new LoadReviewersAction({ reviewerYearId: action.payload.yearId })),
            catchError(error => of(new EndpointCallFailAction(error)))
          );
      })
    );

	@Effect()
  updateReviewer$ = this.actions$.ofType(UPDATE_REVIEWER)
    .pipe(
      switchMap((action: UpdateReviewerAction) => {
        return this.reviewersEndpoint.updateReviewer(action.updatedReviewerData)
          .pipe(
            map(() => new LoadReviewersAction({ reviewerYearId: action.updatedReviewerData.yearId })),
            catchError(error => of(new EndpointCallFailAction(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  endpointCallFail$ = this.actions$.ofType(ENDPOINT_CALL_FAIL)
                          .pipe(
                            switchMap((action: EndpointCallFailAction) => {
                              return this.endpointErrorHandler.handle(action.error);
                            })
                          );

}
