import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LibraryState } from 'app/admin/pages/library/store/reducers/library.reducer';

import * as issueSelectors from 'app/admin/pages/library/store/selectors/issues.selectors';
import * as articleReducer from 'app/admin/pages/library/store/reducers/article.reducer';

const getLibraryState = createFeatureSelector<LibraryState>('library');

const getIssuesState = createSelector(getLibraryState, (state: LibraryState) => state.issues);
export const getIssues = createSelector(getIssuesState, issueSelectors.getIssues);
export const getIssuesLoading = createSelector(getIssuesState, issueSelectors.getLoading);

const getArticlesState = createSelector(getLibraryState, (state: LibraryState) => state.articles);
export const getArticleEntities = createSelector(getArticlesState, articleReducer.getEntities);
export const getArticlesLoading = createSelector(getArticlesState, articleReducer.getLoading);
