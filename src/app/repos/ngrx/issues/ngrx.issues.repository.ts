import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { AppState, RouterStateUrl } from 'app/store/reducers/app.reducers';
import * as issuesSelectors from './issues.selectors';

import { IssuesRepository } from 'app/repos/issues.repository';

import { IIssue } from 'app/models/issue';
import { LoadIssues } from 'app/repos/ngrx/issues/issues.actions';

@Injectable()
export class NgrxIssuesRepository extends IssuesRepository {

  constructor(private store: Store<AppState>,
              private rootStore: Store<RouterStateUrl>) {
    super();
    this.store.dispatch(new LoadIssues());
  }

  getIssueForCurrentRoute(): Observable<IIssue> {
    return this.store.select(issuesSelectors.getIssueByRoute);
  }

  getIssues(): Observable<IIssue[]> {
    return undefined;
  }

  getLoading(): Observable<boolean> {
    return undefined;
  }
}
