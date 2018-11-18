import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError, delay } from 'rxjs/operators';

import { Effect, Actions } from '@ngrx/effects';

import { CREATE_ARTICLE, CreateArticle, LOAD_ARTICLES, LoadArticles, LoadArticlesFail, LoadArticlesSuccess } from 'app/store/actions/articles.actions';

import { ArticleService } from 'app/admin/library/add-article/article.service';

import { IArticle } from 'app/models/article';

@Injectable()
export class ArticlesEffect {

  constructor(private actions$: Actions,
              private articleService: ArticleService) {}

  @Effect()
  loadArticles$ = this.actions$.ofType(LOAD_ARTICLES)
    .pipe(
      switchMap((action: LoadArticles) => {
        return this.articleService.getArticlesInIssue(action.payload)
          .pipe(
            delay(300), // needed to equalize spinner durations
            map((articles: IArticle[]) => new LoadArticlesSuccess(articles)),
            catchError(error => of(new LoadArticlesFail(error)))
          );
      })
    );

  @Effect({dispatch: false})
  createArticle$ = this.actions$.ofType(CREATE_ARTICLE)
    .pipe(
      switchMap((action: CreateArticle) => {
        // @TODO: implement error handler
        return this.articleService.postArticle(action.payload);
      })
    );
}
