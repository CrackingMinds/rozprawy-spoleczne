import { createFeatureSelector, createSelector } from '@ngrx/store';

import { indexingStoreFeatureName } from 'app/admin/pages/indexing/store/store.feature.name';

import { IndexingState } from 'app/admin/pages/indexing/store/reducers/indexing.reducer';

const getEntities = (state: IndexingState) => state.entities;
const getLoading = (state: IndexingState) => state.loading;
const getLoaded = (state: IndexingState) => state.loaded;

const getIndexingState = createFeatureSelector<IndexingState>(indexingStoreFeatureName);

export const getIndexingInfo = createSelector(getIndexingState, getEntities);
export const getIndexingInfoLoading = createSelector(getIndexingState, getLoading);
