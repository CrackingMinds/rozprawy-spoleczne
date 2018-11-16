import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Effect, Actions } from '@ngrx/effects';

import { CREATE_ISSUE, CreateIssue, LOAD_ISSUES, LoadIssuesFail, LoadIssuesSuccess } from 'app/store/actions/issues.actions';

import { IssueService } from 'app/pages/issue/issue.service';
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
}
