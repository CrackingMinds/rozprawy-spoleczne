import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Effect, Actions } from '@ngrx/effects';

import {
  CREATE_ISSUE,
  CreateIssue,
  LOAD_ISSUES,
  LoadIssuesFail,
  LoadIssuesSuccess,
  REMOVE_ISSUE,
  RemoveIssue,
  UPDATE_ISSUE,
  UpdateIssue
} from 'app/repos/ngrx/issues/issues.actions';

import { Issue } from 'app/models/issue';
import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';

@Injectable()
export class IssuesEffect {

  constructor(private actions$: Actions,
              private issueEndpoint: IssueEndpoint) {}

  @Effect()
  loadIssues$ = this.actions$.ofType(LOAD_ISSUES)
    .pipe(
      switchMap(() => {
        return this.issueEndpoint.getAllIssues()
          .pipe(
            map((issues: Issue[]) => new LoadIssuesSuccess(issues)),
            catchError(error => of(new LoadIssuesFail(error)))
          );
      })
    );

  @Effect({dispatch: false})
  createIssues$ = this.actions$.ofType(CREATE_ISSUE)
    .pipe(
      switchMap((action: CreateIssue) => {
        // @TODO: implement error handler
        return this.issueEndpoint.postIssue(action.payload);
      })
    );

  @Effect({dispatch: false})
  removeIssue$ = this.actions$.ofType(REMOVE_ISSUE)
    .pipe(
      switchMap((action: RemoveIssue) => {
        // @TODO: implement error handler
        return this.issueEndpoint.deleteIssue(action.payload);
      })
    );

  @Effect({dispatch: false})
  updateIssue$ = this.actions$.ofType(UPDATE_ISSUE)
    .pipe(
      switchMap((action: UpdateIssue) => {
        // @TODO: implement error handler
        return this.issueEndpoint.updateIssue(action.payload);
      })
    );
}
