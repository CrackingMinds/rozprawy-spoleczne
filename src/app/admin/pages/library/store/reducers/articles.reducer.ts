import { Article } from 'app/models/article';

import {
  ArticleAction,
  CREATE_ARTICLE,
  CREATE_ARTICLE_FAIL,
  LOAD_ARTICLES,
  LOAD_ARTICLES_FAIL,
  LOAD_ARTICLES_SUCCESS, LoadArticlesSuccess
} from 'app/admin/pages/library/store/actions/article.actions';

export type ArticleEntities = { [id: string]: Article };
export type ArticlesEntitiesByIssueId = { [id: string]: ArticleEntities }

export interface ArticleState {
  entities: ArticlesEntitiesByIssueId;
  loaded: boolean;
  loading: boolean;
}

export const initialState: ArticleState = {
  entities: {},
  loaded: false,
  loading: true
};

export function reducer(state = initialState, action: ArticleAction): ArticleState {

  switch (action.type) {

    case LOAD_ARTICLES: {
      return {
        ...state,
        loading: true
      }
    }

    case LOAD_ARTICLES_SUCCESS: {
      const articles: Article[] = (action as LoadArticlesSuccess).articles;
      const entities = turnIntoEntities(articles);
      // const entities = articles.reduce((entities: ArticleEntities, article: IArticle) => {
      //     return {
      //       ...entities,
      //       [article.id]: article
      //     };
      //   }, {});
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      }
    }

    case LOAD_ARTICLES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

    case CREATE_ARTICLE: {
      return {
        ...state,
        loading: true
      }
    }

    case CREATE_ARTICLE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

  }

  return state;
}

export const getArticleEntities = (state: ArticleState) => state.entities;
export const getArticlesLoading = (state: ArticleState) => state.loading;
export const getArticlesLoaded = (state: ArticleState) => state.loaded;

function turnIntoEntities(articles: Article[]): ArticlesEntitiesByIssueId {

  let entities: ArticlesEntitiesByIssueId = {};

  articles.forEach((article: Article) => {
    entities[article.issueId] = { [article.id]: article };
  });

  return entities;
  // debugger

  // const entities = articles.reduce((entities: ArticlesEntitiesByIssueId, article: IArticle) => {
  //
  //   const test = processArticles(articles, article.issueId);
  //   return {
  //     ...entities,
  //   }
  //
  //   return {
  //     ...entities,
  //     [article.id]: article
  //   };
  // }, {});
}

function processArticles(articles: Article[], issueId: string): ArticleEntities {
  return articles.reduce((entities: ArticleEntities, article: Article) => {
    return {
      ...entities,
      [article.id]: article
    }
  }, {});
}
