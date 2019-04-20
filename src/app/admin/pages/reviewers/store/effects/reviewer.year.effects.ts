import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import {
  ADD_REVIEWER_YEAR, AddReviewerYearAction,
  LOAD_REVIEWER_YEARS, LoadReviewerYearsFailAction, LoadReviewerYearsSuccessAction,
  REMOVE_REVIEWER_YEAR, RemoveReviewerYearAction,
  UPDATE_REVIEWER_YEAR, UpdateReviewerYearAction
} from 'app/admin/pages/reviewers/store/actions/reviewer.year.actions';

import { ReviewerYearsEndpoint } from 'app/endpoints/endpoint/reviewer-years/reviewer.years.endpoint';
import { ReviewerYears } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';

@Injectable()
export class ReviewerYearEffects {

  constructor(private actions$: Actions,
              private reviewerYearsEndpoint: ReviewerYearsEndpoint) {}

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

  @Effect({ dispatch: false })
  addReviewer$ = this.actions$.ofType(ADD_REVIEWER_YEAR)
                     .pipe(
                       switchMap((action: AddReviewerYearAction) => {
                         // @TODO: implement error handler
                         return this.reviewerYearsEndpoint.postReviewerYear(action.newReviewerYear);
                       })
                     );

  @Effect({ dispatch: false })
  removeReviewer$ = this.actions$.ofType(REMOVE_REVIEWER_YEAR)
                        .pipe(
                          switchMap((action: RemoveReviewerYearAction) => {
                            // @TODO: implement error handler
                            return this.reviewerYearsEndpoint.deleteReviewerYear(action.reviewerYearId);
                          })
                        );

  @Effect({ dispatch: false })
  updateReviewer$ = this.actions$.ofType(UPDATE_REVIEWER_YEAR)
                        .pipe(
                          switchMap((action: UpdateReviewerYearAction) => {
                            // @TODO: implement error handler
                            return this.reviewerYearsEndpoint.updateReviewerYear(action.updatedReviewerYear);
                          })
                        );

}
