import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import {
  ADD_SCIENTIFIC_BOARD_MEMBER, AddScientificBoardMember,
  LOAD_SCIENTIFIC_BOARD,
  LoadScientificBoardFail,
  LoadScientificBoardSuccess, REMOVE_SCIENTIFIC_BOARD_MEMBER, RemoveScientificBoardMember, UPDATE_SCIENTIFIC_BOARD_MEMBER, UpdateScientificBoardMember
} from 'app/admin/pages/scientific-board/store/actions/scientific.board.actions';

import { EndpointErrorHandler } from 'app/endpoints/endpoint.error.handler';

import { ScientificBoardEndpoint } from 'app/endpoints/endpoint/scientific-board/scientific.board.endpoint';

import { ScientificBoard } from 'app/models/scientific.board';

@Injectable()
export class ScientificBoardEffects {

  constructor(private readonly actions$: Actions,
              private readonly scientificBoardEndpoint: ScientificBoardEndpoint,
              private readonly endpointErrorHandler: EndpointErrorHandler) {}

  @Effect()
  loadScientificBoard$ = this.actions$.ofType(LOAD_SCIENTIFIC_BOARD)
    .pipe(
      switchMap(() => {
        return this.scientificBoardEndpoint.getScientificBoard()
          .pipe(
            map((scientificBoard: ScientificBoard) => new LoadScientificBoardSuccess(scientificBoard)),
            catchError(error => of(new LoadScientificBoardFail(error)))
          );
      })
    );

  @Effect({ dispatch: false })
  addScientificBoardMember$ = this.actions$.ofType(ADD_SCIENTIFIC_BOARD_MEMBER)
    .pipe(
      switchMap((action: AddScientificBoardMember) => {
        return this.scientificBoardEndpoint.postScientificBoardMember(action.memberData);
      }),
      catchError(error => this.endpointErrorHandler.handle(error))
    );

  @Effect({ dispatch: false })
  removeScientificBoardMember$ = this.actions$.ofType(REMOVE_SCIENTIFIC_BOARD_MEMBER)
    .pipe(
      switchMap((action: RemoveScientificBoardMember) => {
        return this.scientificBoardEndpoint.deleteScientificBoardMember(action.memberId);
      }),
      catchError(error => this.endpointErrorHandler.handle(error))
    );

  @Effect({ dispatch: false })
  updateScientificBoardMember$ = this.actions$.ofType(UPDATE_SCIENTIFIC_BOARD_MEMBER)
    .pipe(
      switchMap((action: UpdateScientificBoardMember) => {
        return this.scientificBoardEndpoint.updateScientificBoardMember(action.memberData);
      }),
      catchError(error => this.endpointErrorHandler.handle(error))
    );

}
