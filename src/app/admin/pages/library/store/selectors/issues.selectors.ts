import { createSelector } from '@ngrx/store';

import { IssuesState, IssueStoreEntity } from 'app/admin/pages/library/store/reducers/issue.reducer';

export const getEntities = (state: IssuesState) => state.entities;
export const getLoading = (state: IssuesState) => state.loading;
export const getLoaded = (state: IssuesState) => state.loaded;

export const getIssues = createSelector(getEntities, (entities: IssueStoreEntity) => {
  return Object.keys(entities).map(id => entities[id])
});
