import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import {
  CREATE_ARTICLE,
  CreateArticle,
  ENDPOINT_CALL_FAIL,
  EndpointCallFailAction,
  LOAD_ARTICLES,
  LoadArticles,
  LoadArticlesFail,
  LoadArticlesSuccess,
  REMOVE_ARTICLE,
  RemoveArticle,
  UPDATE_ARTICLE,
  UpdateArticle
} from 'app/admin/pages/library/store/actions/article.actions';

import { ReloadIssue } from 'app/admin/pages/library/store/actions/issue.actions';

import { EndpointErrorHandler } from 'app/endpoints/endpoint.error.handler';

import { ArticleEndpoint } from 'app/endpoints/endpoint/article/article.endpoint';

import { Article } from 'app/models/article';

@Injectable()
export class ArticleEffects {

  constructor(private readonly actions$: Actions,
              private readonly articleEndpoint: ArticleEndpoint,
              private readonly endpointErrorHandler: EndpointErrorHandler) {}

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
                           return this.articleEndpoint.postArticle(action.article)
                                      .pipe(
                                        switchMap(() => [
                                          new ReloadIssue(action.article.issueId),
                                          new LoadArticles(action.article.issueId)
                                        ]),
                                        catchError(error => of(new EndpointCallFailAction(error)))
                                      );
                         })
                       );

  @Effect()
  updateArticle$ = this.actions$.ofType(UPDATE_ARTICLE)
                       .pipe(
                         switchMap((action: UpdateArticle) => {
                            return this.articleEndpoint.updateArticle(action.updatedArticle)
                              .pipe(
                                map(() => new LoadArticles(action.updatedArticle.issueId)),
                                catchError(error => of(new EndpointCallFailAction(error)))
                              );
                         })
                       );

  @Effect()
  removeArticle$ = this.actions$.ofType(REMOVE_ARTICLE)
                       .pipe(
                         switchMap((action: RemoveArticle) => {
                           return this.articleEndpoint.deleteArticle(action.article)
                                      .pipe(
                                        switchMap(() => [
                                          new ReloadIssue(action.article.issueId),
                                          new LoadArticles(action.article.issueId)
                                        ]),
                                        catchError(error => of(new EndpointCallFailAction(error)))
                                      );
                         })
                       );

  @Effect({ dispatch: false })
  endpointCallFail$ = this.actions$.ofType(ENDPOINT_CALL_FAIL)
                          .pipe(
                            switchMap((action: EndpointCallFailAction) => {
                              return this.endpointErrorHandler.handle(action.error);
                            })
                          );

}
