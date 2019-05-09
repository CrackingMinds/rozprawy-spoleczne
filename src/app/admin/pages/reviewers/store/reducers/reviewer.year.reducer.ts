import { ActionReducer } from '@ngrx/store';

import {
  ADD_REVIEWER_YEAR,
  ADD_REVIEWER_YEAR_FAIL,
  LOAD_REVIEWER_YEARS, LOAD_REVIEWER_YEARS_FAIL, LOAD_REVIEWER_YEARS_SUCCESS, LoadReviewerYearsSuccessAction, REMOVE_REVIEWER_YEAR, REMOVE_REVIEWER_YEAR_FAIL,
  ReviewerYearAction, ENDPOINT_CALL_FAIL
} from 'app/admin/pages/reviewers/store/actions/reviewer.year.actions';

import { ReviewerYears } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';

export type ReviewerYearsState = {
  entities: ReviewerYears;
  loaded: boolean;
  loading: boolean;
};

export const initialState: ReviewerYearsState = {
  entities: [],
  loaded: false,
  loading: true
};
export const reviewerYearsReducer: ActionReducer<ReviewerYearsState> = reducer;

export function reducer(state = initialState, action: ReviewerYearAction): ReviewerYearsState {

  switch (action.type) {

    case ADD_REVIEWER_YEAR: {
      return {
        ...state,
        loading: true
      };
    }

    case ADD_REVIEWER_YEAR_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case LOAD_REVIEWER_YEARS: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_REVIEWER_YEARS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: (action as LoadReviewerYearsSuccessAction).reviewerYears
      };
    }

    case LOAD_REVIEWER_YEARS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case REMOVE_REVIEWER_YEAR: {
      return {
        ...state,
        loading: true
      };
    }

    case REMOVE_REVIEWER_YEAR_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case ENDPOINT_CALL_FAIL: {
      return {
        ...state,
        loading: false
      }
    }

  }

  return state;

}
