import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';

import {
  ADD_INDEXING_INFO_ITEM, AddIndexingInfoItemAction,
  LOAD_INDEXING_INFO,
  LoadIndexingInfoFailAction,
  LoadIndexingInfoSuccessAction, REMOVE_INDEXING_INFO_ITEM, RemoveIndexingInfoItemAction, UPDATE_INDEXING_INFO_ITEM, UpdateIndexingInfoItemAction
} from 'app/admin/pages/indexing/store/actions/indexing.actions';

import { IndexingInfo } from 'app/models/indexing';

@Injectable()
export class IndexingEffects {

	constructor(private actions$: Actions,
              private indexingInfoEndpoint: IndexingInfoEndpoint) {}

  @Effect()
  loadIndexingInfo$ = this.actions$.ofType(LOAD_INDEXING_INFO)
    .pipe(
      switchMap(() => {
        return this.indexingInfoEndpoint.getIndexingInfo()
          .pipe(
            map((indexingInfo: IndexingInfo) => new LoadIndexingInfoSuccessAction({ indexingInfo: indexingInfo })),
            catchError(error => of(new LoadIndexingInfoFailAction(error)))
          );
      })
    );

	@Effect({ dispatch: false })
  addIndexingInfoItem$ = this.actions$.ofType(ADD_INDEXING_INFO_ITEM)
    .pipe(
      switchMap((action: AddIndexingInfoItemAction) => {
        // @TODO: implement error handler
        return this.indexingInfoEndpoint.postIndexingInfoItem(action.payload.newIndexingInfoItem);
      })
    );

  @Effect({ dispatch: false })
  removeIndexingInfoItem$ = this.actions$.ofType(REMOVE_INDEXING_INFO_ITEM)
    .pipe(
      switchMap((action: RemoveIndexingInfoItemAction) => {
        // @TODO: implement error handler
        return this.indexingInfoEndpoint.deleteIndexingInfoItem(action.payload.indexingInfoItemId);
      })
    );

  @Effect({ dispatch: false })
  updateIndexingInfoItem$ = this.actions$.ofType(UPDATE_INDEXING_INFO_ITEM)
    .pipe(
      switchMap((action: UpdateIndexingInfoItemAction) => {
        // @TODO: implement error handler
        return this.indexingInfoEndpoint.updateIndexingInfoItem(action.payload.updatedIndexingInfoItem);
      })
    );

}
