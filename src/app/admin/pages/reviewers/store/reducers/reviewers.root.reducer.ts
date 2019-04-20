import { ActionReducerMap } from '@ngrx/store';

import { reviewersReducer, ReviewersState } from 'app/admin/pages/reviewers/store/reducers/reviewers.reducer';
import { reviewerYearsReducer, ReviewerYearsState } from 'app/admin/pages/reviewers/store/reducers/reviewer.year.reducer';

export interface ReviewersRootState {
  reviewers: ReviewersState,
  reviewerYears: ReviewerYearsState
}

export const reviewersRootReducers: ActionReducerMap<ReviewersRootState> = {
  reviewers: reviewersReducer,
  reviewerYears: reviewerYearsReducer
};
