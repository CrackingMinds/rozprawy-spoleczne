import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, routerReducer, RouterStateSerializer } from '@ngrx/router-store';

import * as issuesReducer from 'app/repos/ngrx/issues/issues.reducer';
import * as articlesReducer from 'app/repos/ngrx/articles/articles.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface AppState {
  router: RouterReducerState<RouterStateUrl>,
  issues: issuesReducer.IssuesState,
  articles: articlesReducer.ArticleState
}

export const appReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  issues: issuesReducer.reducer,
  articles: articlesReducer.reducer
};

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while(state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}

export const getAppState = (state: AppState) => state;
