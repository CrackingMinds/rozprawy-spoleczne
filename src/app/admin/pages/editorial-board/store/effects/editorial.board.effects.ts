import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import { EditorialBoardEndpoint } from 'app/endpoints/endpoint/editorial-board/editorial.board.endpoint';

import {
  ADD_EDITORIAL_BOARD_MEMBER, AddEditorialBoardMember,
  LOAD_EDITORIAL_BOARD,
  LoadEditorialBoardFail,
  LoadEditorialBoardSuccess, REMOVE_EDITORIAL_BOARD_MEMBER, RemoveEditorialBoardMember, UPDATE_EDITORIAL_BOARD_MEMBER, UpdateEditorialBoardMember
} from 'app/admin/pages/editorial-board/store/actions/editorial.board.actions';
import { EditorialBoard } from 'app/models/editorial.board';

@Injectable()
export class EditorialBoardEffects {

  constructor(private actions$: Actions,
              private editorialBoardEndpoint: EditorialBoardEndpoint) {}

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

  @Effect({ dispatch: false })
  addEditorialBoardMember$ = this.actions$.ofType(ADD_EDITORIAL_BOARD_MEMBER)
    .pipe(
      switchMap((action: AddEditorialBoardMember) => {
        // @TODO: implement error handler
        return this.editorialBoardEndpoint.postEditorialBoardMember(action.memberData);
      })
    );

  @Effect({ dispatch: false })
  removeEditorialBoardMember$ = this.actions$.ofType(REMOVE_EDITORIAL_BOARD_MEMBER)
    .pipe(
      switchMap((action: RemoveEditorialBoardMember) => {
        // @TODO: implement error handler
        return this.editorialBoardEndpoint.deleteEditorialBoardMember(action.memberId);
      })
    );

  @Effect({ dispatch: false })
  updateEditorialBoardMember$ = this.actions$.ofType(UPDATE_EDITORIAL_BOARD_MEMBER)
    .pipe(
      switchMap((action: UpdateEditorialBoardMember) => {
        // @TODO: implement error handler
        return this.editorialBoardEndpoint.updateEditorialBoardMember(action.memberData);
      })
    );

}
