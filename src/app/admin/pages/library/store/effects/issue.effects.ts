import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import {
  CREATE_ISSUE,
  CreateIssue, ENDPOINT_CALL_FAIL, EndpointCallFailAction,
  LOAD_ISSUES, LoadIssues,
  LoadIssuesFail,
  LoadIssuesSuccess,
  RELOAD_ISSUE,
  ReloadIssue, ReloadIssueSuccess,
  REMOVE_ISSUE,
  RemoveIssue,
  UPDATE_ISSUE,
  UpdateIssue
} from 'app/admin/pages/library/store/actions/issue.actions';

import { EndpointErrorHandler } from 'app/endpoints/endpoint.error.handler';

import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';

import { Issue } from 'app/models/issue';

@Injectable()
export class IssueEffects {

  constructor(private readonly actions$: Actions,
              private readonly issueEndpoint: IssueEndpoint,
              private readonly endpointErrorHandler: EndpointErrorHandler) {
  }

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

  @Effect()
  reloadIssue$ = this.actions$.ofType(RELOAD_ISSUE)
                     .pipe(
                       switchMap((action: ReloadIssue) => {
                         return this.issueEndpoint.getIssue(action.issueId)
                           .pipe(
                             map((issue: Issue) => new ReloadIssueSuccess(issue)),
                             catchError(error => of(new EndpointCallFailAction(error)))
                           );
                       })
                     );

  @Effect()
  createIssues$ = this.actions$.ofType(CREATE_ISSUE)
                      .pipe(
                        switchMap((action: CreateIssue) => {
                          return this.issueEndpoint.postIssue(action.issue)
                            .pipe(
                              map(() => new LoadIssues()),
                              catchError(error => of(new EndpointCallFailAction(error)))
                            );
                        })
                      );

  @Effect()
  removeIssue$ = this.actions$.ofType(REMOVE_ISSUE)
                     .pipe(
                       switchMap((action: RemoveIssue) => {
                         return this.issueEndpoint.deleteIssue(action.issueId)
                           .pipe(
                             map(() => new LoadIssues()),
                             catchError(error => of(new EndpointCallFailAction(error)))
                           );
                       })
                     );

  @Effect()
  updateIssue$ = this.actions$.ofType(UPDATE_ISSUE)
                     .pipe(
                       switchMap((action: UpdateIssue) => {
                         return this.issueEndpoint.updateIssue(action.issue)
                           .pipe(
                             map(() => new LoadIssues()),
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
