import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { IssueState, issuesReducer, getIssueEntities } from 'app/store/reducers/issues.reducer';
import { ArticleState, articlesReducer, getArticleEntities, getArticlesLoading } from 'app/store/reducers/articles.reducer';

export interface LibraryState {
  issues: IssueState;
  articles: ArticleState;
}

export const libraryReducers: ActionReducerMap<LibraryState> = {
  issues: issuesReducer,
  articles: articlesReducer
};

export const getLibraryState = createFeatureSelector<LibraryState>('library');

export const getIssueState = createSelector(getLibraryState, (state: LibraryState) => state.issues);
export const getLibraryIssueEntities = createSelector(getIssueState, getIssueEntities);
export const getLibraryIssues = createSelector(getLibraryIssueEntities, (entities) => {
  return Object.keys(entities).map(id => entities[id])
});

export const getArticlesState = createSelector(getLibraryState, (state: LibraryState) => state.articles);
export const getLibraryArticleEntities = createSelector(getArticlesState, getArticleEntities);
export const getLibraryArticles = createSelector(getLibraryArticleEntities, (entities) => {
  return Object.keys(entities).map(id => entities[id])
});
export const getLibraryArticlesLoading = createSelector(getArticlesState, getArticlesLoading);
