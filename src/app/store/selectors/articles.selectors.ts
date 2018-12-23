import { createSelector } from '@ngrx/store';

import * as articlesReducer from 'app/repos/ngrx/articles/articles.reducer';
import { AppState, getAppState, getRouterState, RouterStateUrl } from 'app/store/reducers/app.reducers';
import { RouterReducerState } from '@ngrx/router-store';
import { IArticle } from 'app/models/article';
import { ArticleEntities, ArticlesEntitiesByIssueId } from 'app/repos/ngrx/articles/articles.reducer';

const getArticlesState = createSelector(getAppState, (state: AppState) => state.articles);
const getArticleEntities = createSelector(getArticlesState, articlesReducer.getArticleEntities);
export const getArticles = createSelector(getArticleEntities, (entities: ArticlesEntitiesByIssueId) => {
  return flatten(entities);
});
export const getArticlesLoading = createSelector(getArticlesState, articlesReducer.getArticlesLoading);

export const getArticlesInSelectedIssue = createSelector(
  getArticleEntities,
  getRouterState,
  (entities: articlesReducer.ArticlesEntitiesByIssueId, router: RouterReducerState<RouterStateUrl>): IArticle[] => {
    return router.state && flattenArticles(entities[router.state.params.issueId]);
  }
);

function flatten(entities: ArticlesEntitiesByIssueId): IArticle[] {
  let articles: IArticle[] = [];

  Object.keys(entities).forEach((issueId: string) => {
    articles.push(...flattenArticles(entities[issueId]));
  });

  return articles;
}

function flattenArticles(articleEntities: ArticleEntities): IArticle[] {
  return Object.keys(articleEntities).map(id => articleEntities[id]);
}
