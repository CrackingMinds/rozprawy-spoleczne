import { Action } from '@ngrx/store';

import { IIndexing } from 'app/models/indexing';

export const LOAD_INDEXING_INFO = '[Indexing info] Load Indexing info';
export const LOAD_INDEXING_INFO_SUCCESS = '[Indexing info] Load Indexing info success';
export const LOAD_INDEXING_INFO_FAIL = '[Indexing info] Load Indexing info fail';

export class LoadIndexingInfo implements Action {
  readonly type: string = LOAD_INDEXING_INFO;
  constructor(public payload?: any) {}
}

export class LoadIndexingInfoSuccess implements Action {
  readonly type: string = LOAD_INDEXING_INFO_SUCCESS;
  constructor(public payload?: IIndexing[]) {}
}

export class LoadIndexingInfoFail implements Action {
  readonly type: string = LOAD_INDEXING_INFO_FAIL;
  constructor(public payload?: any) {}
}

export type IndexingInfoActions =
  LoadIndexingInfo |
  LoadIndexingInfoSuccess |
  LoadIndexingInfoFail;
