import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, delay } from 'rxjs/operators';

import { Effect, Actions } from '@ngrx/effects';

import { CREATE_ARTICLE, CreateArticle, LOAD_ARTICLES, LoadArticles, LoadArticlesFail, LoadArticlesSuccess } from 'app/admin/pages/library/store/actions/article.actions';

import { Article } from 'app/models/article';
import { ArticleEndpoint } from 'app/endpoints/endpoint/article/article.endpoint';

@Injectable()
export class ArticleEffects {

  constructor(private actions$: Actions,
              private articleEndpoint: ArticleEndpoint) {}

  // @Effect()
  // loadArticles$ = this.actions$.ofType(LOAD_ARTICLES)
  //   .pipe(
  //     switchMap(() => {
  //       return this.articleService.getArticles()
  //         .pipe(
  //           delay(300), // needed to equalize spinner durations
  //           map((articles: IArticle[]) => new LoadArticlesSuccess(articles)),
  //           catchError(error => of(new LoadArticlesFail(error)))
  //         );
  //     })
  //   );

  @Effect({dispatch: false})
  createArticle$ = this.actions$.ofType(CREATE_ARTICLE)
    .pipe(
      switchMap((action: CreateArticle) => {
        // @TODO: implement error handler
        return this.articleEndpoint.postArticle(action.article);
      })
    );
}
