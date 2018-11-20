import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import { LOAD_INDEXING_INFO, LoadIndexingInfoFail, LoadIndexingInfoSuccess } from 'app/store/actions/indexing.info.actions';

import { IndexingService } from 'app/pages/indexing/indexing.service';
import { IIndexing } from 'app/models/indexing';

@Injectable()
export class IndexingInfoEffects {

  constructor(private actions$: Actions,
              private indexingInfoService: IndexingService) {}

  @Effect()
  loadIndexingInfo$ = this.actions$.ofType(LOAD_INDEXING_INFO)
    .pipe(
      switchMap(() => {
        return this.indexingInfoService.getIndexingInfo()
          .pipe(
            map((indexingInfo: IIndexing[]) => new LoadIndexingInfoSuccess(indexingInfo)),
            catchError(error => of(new LoadIndexingInfoFail(error)))
          )
      })
    );

}
