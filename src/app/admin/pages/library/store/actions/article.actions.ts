import { Action } from '@ngrx/store';

import { Article, ArticleEntity, UntypedArticle } from 'app/models/article';

export const ACTION_PREFIX: string = '[Library Articles]';

export const LOAD_ARTICLES = `${ACTION_PREFIX} Load Articles`;
export const LOAD_ARTICLES_SUCCESS = `${ACTION_PREFIX} Load Articles Success`;
export const LOAD_ARTICLES_FAIL = `${ACTION_PREFIX} Load Articles Fail`;

export const CREATE_ARTICLE = `${ACTION_PREFIX} Create Article`;
export const CREATE_ARTICLE_FAIL = `${ACTION_PREFIX} Create Article Fail`;

export const UPDATE_ARTICLE = `${ACTION_PREFIX} Update Article`;
export const UPDATE_ARTICLE_FAIL = `${ACTION_PREFIX} Update Article Fail`;

export const REMOVE_ARTICLE = `${ACTION_PREFIX} Remove Article`;
export const REMOVE_ARTICLE_FAIL = `${ACTION_PREFIX} Remove Article Fail`;

export const RESET_ARTICLES_STATE = `${ACTION_PREFIX} Reset state`;

export const ENDPOINT_CALL_FAIL = `${ACTION_PREFIX} Endpoint Call Fail`;

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

export class UpdateArticle implements Action {
  readonly type: string = UPDATE_ARTICLE;
  constructor(public updatedArticle: UntypedArticle) {}
}

export class UpdateArticleFail implements Action {
  readonly type: string = UPDATE_ARTICLE_FAIL;
  constructor(public error: any) {}
}

export class RemoveArticle implements Action {
  readonly type: string = REMOVE_ARTICLE;
  constructor(public article: Article) {}
}

export class RemoveArticleFail implements Action {
  readonly type: string = REMOVE_ARTICLE_FAIL;
  constructor(public error: any) {}
}

export class ResetArticlesStateAction implements Action {
  readonly type: string = RESET_ARTICLES_STATE;
}

export class EndpointCallFailAction implements Action {
  readonly type: string = ENDPOINT_CALL_FAIL;
  constructor(public readonly error: any) {}
}

export type ArticleAction =
  LoadArticles|
  LoadArticlesSuccess |
  LoadArticlesFail |

  CreateArticle |
  CreateArticleFail |

  RemoveArticle |
  RemoveArticleFail |

  ResetArticlesStateAction |

  EndpointCallFailAction;
