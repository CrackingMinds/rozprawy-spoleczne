import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import { EndpointErrorHandler } from 'app/endpoints/endpoint.error.handler';

import { EditorialBoardEndpoint } from 'app/endpoints/endpoint/editorial-board/editorial.board.endpoint';

import {
  ADD_EDITORIAL_BOARD_MEMBER, AddEditorialBoardMember,
  LOAD_EDITORIAL_BOARD,
  LoadEditorialBoardFail,
  LoadEditorialBoardSuccess, REMOVE_EDITORIAL_BOARD_MEMBER, RemoveEditorialBoardMember, UPDATE_EDITORIAL_BOARD_MEMBER, UpdateEditorialBoardMember,
  ENDPOINT_CALL_FAIL, EndpointCallFailAction, LoadEditorialBoard
} from 'app/admin/pages/editorial-board/store/actions/editorial.board.actions';
import { EditorialBoard } from 'app/models/editorial.board';

@Injectable()
export class EditorialBoardEffects {

  constructor(private readonly actions$: Actions,
              private readonly editorialBoardEndpoint: EditorialBoardEndpoint,
              private readonly endpointErrorHandler: EndpointErrorHandler) {}

  @Effect()
  loadEditorialBoard$ = this.actions$.ofType(LOAD_EDITORIAL_BOARD)
    .pipe(
      switchMap(() => {
        return this.editorialBoardEndpoint.getEditorialBoard()
          .pipe(
            map((editorialBoard: EditorialBoard) => new LoadEditorialBoardSuccess(editorialBoard)),
            catchError(error => of(new LoadEditorialBoardFail(error)))
          );
      })
    );

  @Effect()
  addEditorialBoardMember$ = this.actions$.ofType(ADD_EDITORIAL_BOARD_MEMBER)
    .pipe(
      switchMap((action: AddEditorialBoardMember) => {
        return this.editorialBoardEndpoint.postEditorialBoardMember(action.memberData)
          .pipe(
            map(() => new LoadEditorialBoard()),
            catchError(error => of(new EndpointCallFailAction(error)))
          );
      })
    );

  @Effect()
  removeEditorialBoardMember$ = this.actions$.ofType(REMOVE_EDITORIAL_BOARD_MEMBER)
    .pipe(
      switchMap((action: RemoveEditorialBoardMember) => {
        return this.editorialBoardEndpoint.deleteEditorialBoardMember(action.memberId)
          .pipe(
            map(() => new LoadEditorialBoard()),
            catchError(error => of(new EndpointCallFailAction(error)))
          );
      })
    );

  @Effect()
  updateEditorialBoardMember$ = this.actions$.ofType(UPDATE_EDITORIAL_BOARD_MEMBER)
    .pipe(
      switchMap((action: UpdateEditorialBoardMember) => {
        return this.editorialBoardEndpoint.updateEditorialBoardMember(action.memberData)
          .pipe(
            map(() => new LoadEditorialBoard()),
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
