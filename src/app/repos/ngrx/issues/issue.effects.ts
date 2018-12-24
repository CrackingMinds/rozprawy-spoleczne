import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import { LOAD_ISSUE, LoadIssue, LoadIssueFail, LoadIssueSuccess } from 'app/repos/ngrx/issues/issue.actions';

import { Issue } from 'app/models/issue';
import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';

@Injectable()
export class IssueEffects {

  constructor(private actions$: Actions,
              private issueEndpoint: IssueEndpoint) {}

  @Effect()
  loadIssue$ = this.actions$.ofType(LOAD_ISSUE)
    .pipe(
      switchMap((action: LoadIssue) => {
        return this.issueEndpoint.getIssue(action.payload)
          .pipe(
            map((issue: Issue) => new LoadIssueSuccess(issue)),
            catchError(error => of(new LoadIssueFail(error)))
          );
      })
    );
}
