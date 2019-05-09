import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import {
  ADD_INDEXING_INFO_ITEM, AddIndexingInfoItemAction,
  LOAD_INDEXING_INFO,
  LoadIndexingInfoFailAction,
  LoadIndexingInfoSuccessAction, REMOVE_INDEXING_INFO_ITEM, RemoveIndexingInfoItemAction, UPDATE_INDEXING_INFO_ITEM, UpdateIndexingInfoItemAction,
  ENDPOINT_CALL_FAIL, EndpointCallFailAction, LoadIndexingInfoAction
} from 'app/admin/pages/indexing/store/actions/indexing.actions';

import { EndpointErrorHandler } from 'app/endpoints/endpoint.error.handler';

import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';

import { IndexingInfo } from 'app/models/indexing';

@Injectable()
export class IndexingEffects {

	constructor(private readonly actions$: Actions,
              private readonly indexingInfoEndpoint: IndexingInfoEndpoint,
              private readonly endpointErrorHandler: EndpointErrorHandler) {}

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

	@Effect()
  addIndexingInfoItem$ = this.actions$.ofType(ADD_INDEXING_INFO_ITEM)
    .pipe(
      switchMap((action: AddIndexingInfoItemAction) => {
        return this.indexingInfoEndpoint.postIndexingInfoItem(action.payload.newIndexingInfoItem)
          .pipe(
            map(() => new LoadIndexingInfoAction()),
            catchError(error => of(new EndpointCallFailAction(error)))
          );
      })
    );

  @Effect()
  removeIndexingInfoItem$ = this.actions$.ofType(REMOVE_INDEXING_INFO_ITEM)
    .pipe(
      switchMap((action: RemoveIndexingInfoItemAction) => {
        return this.indexingInfoEndpoint.deleteIndexingInfoItem(action.payload.indexingInfoItemId)
          .pipe(
            map(() => new LoadIndexingInfoAction()),
            catchError(error => of(new EndpointCallFailAction(error)))
          );
      })
    );

  @Effect()
  updateIndexingInfoItem$ = this.actions$.ofType(UPDATE_INDEXING_INFO_ITEM)
    .pipe(
      switchMap((action: UpdateIndexingInfoItemAction) => {
        return this.indexingInfoEndpoint.updateIndexingInfoItem(action.payload.updatedIndexingInfoItem)
          .pipe(
            map(() => new LoadIndexingInfoAction()),
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
