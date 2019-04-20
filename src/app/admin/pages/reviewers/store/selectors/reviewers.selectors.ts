import { ReviewersState } from 'app/admin/pages/reviewers/store/reducers/reviewers.reducer';

export const getEntities = (state: ReviewersState) => state.entities;
export const getLoading = (state: ReviewersState) => state.loading;
export const getLoaded = (state: ReviewersState) => state.loaded;
