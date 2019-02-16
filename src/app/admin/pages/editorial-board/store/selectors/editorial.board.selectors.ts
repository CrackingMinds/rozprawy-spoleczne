import { createSelector, createFeatureSelector } from '@ngrx/store';

import { editorialBoardStoreFeatureName } from 'app/admin/pages/editorial-board/store/store.feature.name';

import { EditorialBoardState } from 'app/admin/pages/editorial-board/store/reducers/editorial.board.reducer';

const getEntities = (state: EditorialBoardState) => state.entities;
const getLoading = (state: EditorialBoardState) => state.loading;
const getLoaded = (state: EditorialBoardState) => state.loaded;

const getEditorialBoardState = createFeatureSelector<EditorialBoardState>(editorialBoardStoreFeatureName);

export const getEditorialBoard = createSelector(getEditorialBoardState, getEntities);
export const getEditorialBoardLoading = createSelector(getEditorialBoardState, getLoading);

