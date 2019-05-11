import { ActionReducer } from '@ngrx/store';

import {
  ADD_REVIEWER,
  ADD_REVIEWER_FAIL,
  LOAD_REVIEWERS, LOAD_REVIEWERS_FAIL,
  LOAD_REVIEWERS_SUCCESS, LoadReviewersSuccessAction, REMOVE_REVIEWER, REMOVE_REVIEWER_FAIL,
  ReviewerAction, ENDPOINT_CALL_FAIL, RESET_REVIEWERS_STATE
} from 'app/admin/pages/reviewers/store/actions/reviewers.actions';

import { Reviewers } from 'app/models/reviewer';

export type ReviewersState = {
  entities: Reviewers;
  loaded: boolean;
  loading: boolean;
};

export const initialState: ReviewersState = {
  entities: [],
  loaded: false,
  loading: true
};
export const reviewersReducer: ActionReducer<ReviewersState> = reducer;

export function reducer(state = initialState, action: ReviewerAction): ReviewersState {

  switch (action.type) {

    case ADD_REVIEWER: {
      return {
        ...state,
        loading: true
      };
    }

    case ADD_REVIEWER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case LOAD_REVIEWERS: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_REVIEWERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: (action as LoadReviewersSuccessAction).reviewers
      };
    }

    case LOAD_REVIEWERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case REMOVE_REVIEWER: {
      return {
        ...state,
        loading: true
      };
    }

    case REMOVE_REVIEWER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case RESET_REVIEWERS_STATE: {
      return initialState;
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
