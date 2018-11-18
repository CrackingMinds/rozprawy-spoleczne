import { IArticle } from 'app/models/article';

import {
  ArticlesAction,
  CREATE_ARTICLE,
  CREATE_ARTICLE_FAIL,
  LOAD_ARTICLES,
  LOAD_ARTICLES_FAIL,
  LOAD_ARTICLES_SUCCESS
} from 'app/store/actions/articles.actions';

type ArticleEntities = { [id: string]: IArticle };

export interface ArticleState {
  entities: ArticleEntities;
  loaded: boolean;
  loading: boolean;
}

export const initialState: ArticleState = {
  entities: {},
  loaded: false,
  loading: true
};

export function articlesReducer(state = initialState, action: ArticlesAction): ArticleState {

  switch (action.type) {

    case LOAD_ARTICLES: {
      return {
        ...state,
        loading: true
      }
    }

    case LOAD_ARTICLES_SUCCESS: {
      const articles = action.payload;
      const entities = articles.reduce((entities: ArticleEntities, article: IArticle) => {
          return {
            ...entities,
            [article.id]: article
          };
        }, {});
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
