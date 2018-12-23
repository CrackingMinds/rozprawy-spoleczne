import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import { LOAD_ISSUE, LoadIssue, LoadIssueFail, LoadIssueSuccess } from 'app/repos/ngrx/issues/issue.actions';

import { IssueService } from 'app/services/endpoint/issue/issue.service';
import { IIssue } from 'app/models/issue';

@Injectable()
export class IssueEffects {

  constructor(private actions$: Actions,
              private issueService: IssueService) {}

  @Effect()
  loadIssue$ = this.actions$.ofType(LOAD_ISSUE)
    .pipe(
      switchMap((action: LoadIssue) => {
        return this.issueService.getIssue(action.payload)
          .pipe(
            map((issue: IIssue) => new LoadIssueSuccess(issue)),
            catchError(error => of(new LoadIssueFail(error)))
          );
      })
    );
}
