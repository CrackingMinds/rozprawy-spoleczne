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

import { IssueService } from 'app/services/endpoint/issue/issue.service';
import { IIssue } from 'app/models/issue';

@Injectable()
export class IssuesEffect {

  constructor(private actions$: Actions,
              private issueService: IssueService) {}

  @Effect()
  loadIssues$ = this.actions$.ofType(LOAD_ISSUES)
    .pipe(
      switchMap(() => {
        return this.issueService.getIssues()
          .pipe(
            map((issues: IIssue[]) => new LoadIssuesSuccess(issues)),
            catchError(error => of(new LoadIssuesFail(error)))
          );
      })
    );

  @Effect({dispatch: false})
  createIssues$ = this.actions$.ofType(CREATE_ISSUE)
    .pipe(
      switchMap((action: CreateIssue) => {
        // @TODO: implement error handler
        return this.issueService.postIssue(action.payload);
      })
    );

  @Effect({dispatch: false})
  removeIssue$ = this.actions$.ofType(REMOVE_ISSUE)
    .pipe(
      switchMap((action: RemoveIssue) => {
        // @TODO: implement error handler
        return this.issueService.deleteIssue(action.payload);
      })
    );

  @Effect({dispatch: false})
  updateIssue$ = this.actions$.ofType(UPDATE_ISSUE)
    .pipe(
      switchMap((action: UpdateIssue) => {
        // @TODO: implement error handler
        return this.issueService.updateIssue(action.payload);
      })
    );
}
