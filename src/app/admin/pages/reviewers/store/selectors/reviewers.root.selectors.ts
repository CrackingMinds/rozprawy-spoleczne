import { createFeatureSelector, createSelector } from '@ngrx/store';

import { reviewersStoreFeatureName } from 'app/admin/pages/reviewers/store/store.feature.name';

import { ReviewersRootState } from 'app/admin/pages/reviewers/store/reducers/reviewers.root.reducer';

import * as reviewersSelectors from 'app/admin/pages/reviewers/store/selectors/reviewers.selectors';
import * as reviewersYearsSelectors from 'app/admin/pages/reviewers/store/selectors/reviewer.year.selectors';

const getReviewersRootState = createFeatureSelector<ReviewersRootState>(reviewersStoreFeatureName);

const getReviewersState = createSelector(getReviewersRootState, (state: ReviewersRootState) => state.reviewers);
export const getReviewers = createSelector(getReviewersState, reviewersSelectors.getEntities);
export const getReviewersLoading = createSelector(getReviewersState, reviewersSelectors.getLoading);

const getReviewerYearsState = createSelector(getReviewersRootState, (state: ReviewersRootState) => state.reviewerYears);
export const getReviewerYears = createSelector(getReviewerYearsState, reviewersYearsSelectors.getEntities);
export const getReviewerYearsLoading = createSelector(getReviewerYearsState, reviewersYearsSelectors.getLoading);
