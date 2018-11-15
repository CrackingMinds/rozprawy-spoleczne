import { Action } from '@ngrx/store';

import { IArticle } from 'app/models/article';

export const LOAD_ARTICLES = '[Articles] Load Articles';
export const LOAD_ARTICLES_SUCCESS = '[Articles] Load Articles Success';
export const LOAD_ARTICLES_FAIL = '[Articles] Load Articles Fail';

export class LoadArticles implements Action {
  readonly type: string = LOAD_ARTICLES;
  constructor(public payload: string) {}
}

export class LoadArticlesSuccess implements Action {
  readonly type: string = LOAD_ARTICLES_SUCCESS;
  constructor(public payload: IArticle[]) {}
}

export class LoadArticlesFail implements Action {
  readonly type: string = LOAD_ARTICLES_FAIL;
  constructor(public payload: any) {}
}

export type ArticlesAction = LoadArticles | LoadArticlesSuccess | LoadArticlesFail;
