import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { articlesReducer, ArticleState, getArticleEntities, getArticlesLoading } from 'app/store/reducers/articles.reducer';
import { issueReducer, IssueState } from 'app/store/reducers/issue.reducer';
import { getRouterState, RouterStateUrl } from 'app/store/reducers/app.reducers';
import { RouterReducerState } from '@ngrx/router-store';

export interface IssuePageState {
  issue: IssueState;
  articles: ArticleState;
}

export const issuePageReducers: ActionReducerMap<IssuePageState> = {
  issue: issueReducer,
  articles: articlesReducer
};

export const getIssuePageState = createFeatureSelector<IssuePageState>('issuePage');

const getIssueState = createSelector(getIssuePageState, (state: IssuePageState) => state.issue);
export const getIssue = createSelector(getIssueState, (state: IssueState) => state.issue);
export const getIssueLoading = createSelector(getIssueState, (state: IssueState) => state.loading);

export const getCurrentIssueId = createSelector(getRouterState, (state: RouterReducerState<RouterStateUrl>) => state && state.state.params.issueId);

const getArticlesState = createSelector(getIssuePageState, (state: IssuePageState) => state.articles);
const getIssuePageArticleEntities = createSelector(getArticlesState, getArticleEntities);
export const getIssuePageArticles = createSelector(getIssuePageArticleEntities, (entities) => {
  return Object.keys(entities).map(id => entities[id]);
});
export const getIssuePageArticlesLoading = createSelector(getArticlesState, getArticlesLoading);
