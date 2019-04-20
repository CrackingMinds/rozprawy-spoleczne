import { ReviewerYearsState } from 'app/admin/pages/reviewers/store/reducers/reviewer.year.reducer';

export const getEntities = (state: ReviewerYearsState) => state.entities;
export const getLoading = (state: ReviewerYearsState) => state.loading;
export const getLoaded = (state: ReviewerYearsState) => state.loaded;
