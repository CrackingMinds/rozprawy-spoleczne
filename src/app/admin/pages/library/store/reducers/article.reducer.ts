import { Article } from 'app/models/article';

import {
  ArticleAction,
  CREATE_ARTICLE,
  CREATE_ARTICLE_FAIL,
  LOAD_ARTICLES,
  LOAD_ARTICLES_FAIL,
  LOAD_ARTICLES_SUCCESS, LoadArticlesSuccess, REMOVE_ARTICLE, UPDATE_ARTICLE, UPDATE_ARTICLE_FAIL
} from 'app/admin/pages/library/store/actions/article.actions';

export interface ArticlesState {
  entities: Article[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: ArticlesState = {
  entities: [],
  loaded: false,
  loading: true
};

export function reducer(state = initialState, action: ArticleAction): ArticlesState {

  switch (action.type) {

    case LOAD_ARTICLES: {
      return {
        ...state,
        loading: true
      }
    }

    case LOAD_ARTICLES_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: (action as LoadArticlesSuccess).articles
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

    case UPDATE_ARTICLE: {
      return {
        ...state,
        loading: true
      }
    }

    case UPDATE_ARTICLE_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

    case REMOVE_ARTICLE: {
      return {
        ...state,
        loading: true
      }
    }

  }

  return state;
}

export const getEntities = (state: ArticlesState) => state.entities;
export const getLoading = (state: ArticlesState) => state.loading;
export const getLoaded = (state: ArticlesState) => state.loaded;
