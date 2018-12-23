import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState } from 'app/store/reducers/app.reducers';

import { ArticlesRepository } from 'app/repos/articles.repository';

import { IArticle } from 'app/models/article';
import { LoadArticles } from 'app/repos/ngrx/articles/articles.actions';

@Injectable()
export class NgrxArticlesRepository extends ArticlesRepository {

  constructor(private store: Store<AppState>) {
    super();
    this.store.dispatch(new LoadArticles());
  }

  getArticles(issueId?: string): Observable<IArticle[]> {

    if (!issueId) {
      return undefined;
    } else {
      return undefined;
    }

  }

  getArticlesForCurrentRoute(): Observable<IArticle[]> {
    // return this.store.select()
    return undefined;
  }

  getLoading(): Observable<boolean> {
    return undefined;
  }

}
