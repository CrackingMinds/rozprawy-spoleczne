import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, delay } from 'rxjs/operators';

import { Effect, Actions } from '@ngrx/effects';

import {
  CREATE_ARTICLE,
  CreateArticle,
  LOAD_ARTICLES,
  LoadArticles,
  LoadArticlesFail,
  LoadArticlesSuccess,
  REMOVE_ARTICLE, RemoveArticle
} from 'app/admin/pages/library/store/actions/article.actions';

import { Article } from 'app/models/article';
import { ArticleEndpoint } from 'app/endpoints/endpoint/article/article.endpoint';
import { ReloadIssue } from 'app/admin/pages/library/store/actions/issue.actions';

@Injectable()
export class ArticleEffects {

  constructor(private actions$: Actions,
              private articleEndpoint: ArticleEndpoint) {}

  @Effect()
  loadArticles$ = this.actions$.ofType(LOAD_ARTICLES)
    .pipe(
      switchMap((action: LoadArticles) => {
        return this.articleEndpoint.getIssueArticles(action.issueId)
          .pipe(
            delay(300), // needed to equalize spinner durations
            map((articles: Article[]) => new LoadArticlesSuccess(articles)),
            catchError(error => of(new LoadArticlesFail(error)))
          );
      })
    );

  @Effect()
  createArticle$ = this.actions$.ofType(CREATE_ARTICLE)
    .pipe(
      switchMap((action: CreateArticle) => {
        // @TODO: implement error handler
        return this.articleEndpoint.postArticle(action.article)
          .pipe(
            map(() => new ReloadIssue(action.article.issueId))
          )
      })
    );

  @Effect()
  removeArticle$ = this.actions$.ofType(REMOVE_ARTICLE)
    .pipe(
      switchMap((action: RemoveArticle) => {
        // @TODO: implement error handler
        return this.articleEndpoint.deleteArticle(action.article)
          .pipe(
            map(() => new ReloadIssue(action.article.issueId))
          )
      })
    )
}
