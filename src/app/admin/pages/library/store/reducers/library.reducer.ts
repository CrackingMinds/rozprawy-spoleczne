import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { IssuesState } from 'app/admin/pages/library/store/reducers/issue.reducer';
import { ArticlesState } from 'app/admin/pages/library/store/reducers/article.reducer';

import * as articleReducer from 'app/admin/pages/library/store/reducers/article.reducer';
import * as issueReducer from 'app/admin/pages/library/store/reducers/issue.reducer';

export interface LibraryState {
  issues: IssuesState;
  articles: ArticlesState;
}

export const libraryReducers: ActionReducerMap<LibraryState> = {
  issues: issueReducer.reducer,
  articles: articleReducer.reducer
};

const getLibraryState = createFeatureSelector<LibraryState>('library');

const getIssuesState = createSelector(getLibraryState, (state: LibraryState) => state.issues);
export const getIssueEntities = createSelector(getIssuesState, issueReducer.getEntities);
export const getIssuesLoading = createSelector(getIssuesState, issueReducer.getLoading);

const getArticlesState = createSelector(getLibraryState, (state: LibraryState) => state.articles);
export const getArticleEntities = createSelector(getArticlesState, articleReducer.getEntities);
export const getArticlesLoading = createSelector(getArticlesState, articleReducer.getLoading);
