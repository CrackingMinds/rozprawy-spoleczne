import { Injectable, Inject } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import {
  ADD_REVIEWER_YEAR, AddReviewerYearAction,
  LOAD_REVIEWER_YEARS, LoadReviewerYearsFailAction, LoadReviewerYearsSuccessAction,
  REMOVE_REVIEWER_YEAR, RemoveReviewerYearAction,
  UPDATE_REVIEWER_YEAR, UpdateReviewerYearAction,
  ENDPOINT_CALL_FAIL, EndpointCallFailAction, LoadReviewerYearsAction
} from 'app/admin/pages/reviewers/store/actions/reviewer.year.actions';

import { EndpointErrorHandler } from 'app/endpoints/endpoint.error.handler';

import { REVIEWER_YEARS_ENDPOINT, ReviewerYearsEndpoint } from 'app/endpoints/endpoint/reviewer-years/reviewer.years.endpoint';

import { ReviewerYears } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';

@Injectable()
export class ReviewerYearEffects {

  constructor(private readonly actions$: Actions,
              @Inject(REVIEWER_YEARS_ENDPOINT) private readonly reviewerYearsEndpoint: ReviewerYearsEndpoint,
              private readonly endpointErrorHandler: EndpointErrorHandler) {}

  @Effect()
  loadReviewers$ = this.actions$.ofType(LOAD_REVIEWER_YEARS)
                       .pipe(
                         switchMap(() => {
                           return this.reviewerYearsEndpoint.getReviewerYears()
                                      .pipe(
                                        map((reviewerYears: ReviewerYears) => new LoadReviewerYearsSuccessAction(reviewerYears)),
                                        catchError(error => of(new LoadReviewerYearsFailAction(error)))
                                      );
                         })
                       );

  @Effect()
  addReviewer$ = this.actions$.ofType(ADD_REVIEWER_YEAR)
                     .pipe(
                       switchMap((action: AddReviewerYearAction) => {
                         return this.reviewerYearsEndpoint.postReviewerYear(action.newReviewerYear)
                           .pipe(
                             map(() => new LoadReviewerYearsAction()),
                             catchError(error => of(new EndpointCallFailAction(error)))
                           );
                       })
                     );

  @Effect()
  removeReviewer$ = this.actions$.ofType(REMOVE_REVIEWER_YEAR)
                        .pipe(
                          switchMap((action: RemoveReviewerYearAction) => {
                            return this.reviewerYearsEndpoint.deleteReviewerYear(action.reviewerYearId)
                              .pipe(
                                map(() => new LoadReviewerYearsAction()),
                                catchError(error => of(new EndpointCallFailAction(error)))
                              );
                          })
                        );

  @Effect()
  updateReviewer$ = this.actions$.ofType(UPDATE_REVIEWER_YEAR)
                        .pipe(
                          switchMap((action: UpdateReviewerYearAction) => {
                            return this.reviewerYearsEndpoint.updateReviewerYear(action.updatedReviewerYear)
                              .pipe(
                                map(() => new LoadReviewerYearsAction()),
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
