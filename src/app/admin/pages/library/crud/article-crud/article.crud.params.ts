import { Article } from 'app/models/article';
import { Issue } from 'app/models/issue';

export interface ArticleCrudParams {
  type: ArticleCrudType;
  payload: ArticleCrudPayload;
}

export enum ArticleCrudType {
  CREATE,
  EDIT
}

export type ArticleCrudPayload = ArticleEditPayload | ArticleCreatePayload;

export type ArticleEditPayload = {
  article: Article;
}

export type ArticleCreatePayload = {
  issue: Issue;
}

export class ArticleEditParams implements ArticleCrudParams {
  readonly type: ArticleCrudType = ArticleCrudType.EDIT;
  constructor(public readonly payload: ArticleEditPayload) {}
}

export class ArticleCreateParams implements ArticleCrudParams {
  readonly type: ArticleCrudType = ArticleCrudType.CREATE;
  constructor(public readonly payload: ArticleCreatePayload) {}
}
