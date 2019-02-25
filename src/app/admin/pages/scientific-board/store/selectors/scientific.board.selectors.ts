import { createFeatureSelector, createSelector } from '@ngrx/store';

import { scientificBoardStoreFeatureName } from 'app/admin/pages/scientific-board/store/store.feature.name';

import { ScientificBoardState } from 'app/admin/pages/scientific-board/store/reducers/scientific.board.reducer';

const getEntities = (state: ScientificBoardState) => state.entities;
const getLoading = (state: ScientificBoardState) => state.loading;
const getLoaded = (state: ScientificBoardState) => state.loaded;

const getScientificBoardState = createFeatureSelector<ScientificBoardState>(scientificBoardStoreFeatureName);

export const getScientificBoard = createSelector(getScientificBoardState, getEntities);
export const getScientificBoardLoading = createSelector(getScientificBoardState, getLoading);
