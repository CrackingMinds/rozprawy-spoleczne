import { Action } from '@ngrx/store';

import { Article, ArticleEntity } from 'app/models/article';

import { ACTION_PREFIX } from 'app/admin/pages/library/store/actions/action.prefix';

export const LOAD_ARTICLES = `${ACTION_PREFIX} Load Articles`;
export const LOAD_ARTICLES_SUCCESS = `${ACTION_PREFIX} Load Articles Success`;
export const LOAD_ARTICLES_FAIL = `${ACTION_PREFIX} Load Articles Fail`;

export const CREATE_ARTICLE = `${ACTION_PREFIX} Create Article`;
export const CREATE_ARTICLE_FAIL = `${ACTION_PREFIX} Create Article Fail`;

export class LoadArticles implements Action {
  readonly type: string = LOAD_ARTICLES;
  constructor(public issueId: string) {}
}

export class LoadArticlesSuccess implements Action {
  readonly type: string = LOAD_ARTICLES_SUCCESS;
  constructor(public articles: Article[]) {}
}

export class LoadArticlesFail implements Action {
  readonly type: string = LOAD_ARTICLES_FAIL;
  constructor(public error: any) {}
}

export class CreateArticle implements Action {
  readonly type: string = CREATE_ARTICLE;
  constructor(public article: ArticleEntity) {}
}

export class CreateArticleFail implements Action {
  readonly type: string = CREATE_ARTICLE_FAIL;
  constructor(public error: any) {}
}

export type ArticleAction =
  LoadArticles|
  LoadArticlesSuccess |
  LoadArticlesFail |

  CreateArticle |
  CreateArticleFail;
