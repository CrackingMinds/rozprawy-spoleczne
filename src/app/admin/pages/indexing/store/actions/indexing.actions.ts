import { Action } from '@ngrx/store';

import { ACTION_PREFIX } from 'app/admin/pages/indexing/store/actions/action.prefix';
import { IndexingInfo, NewIndexingInfoItem, UpdatedIndexingInfoItem } from 'app/models/indexing';

const createActionName = 'Add Indexing Info Item';
export const ADD_INDEXING_INFO_ITEM = `${ACTION_PREFIX} ${createActionName}`;
export const ADD_INDEXING_INFO_ITEM_FAIL = `${ACTION_PREFIX} ${createActionName} Fail`;

const readActionName = 'Load Indexing Info';
export const LOAD_INDEXING_INFO = `${ACTION_PREFIX} ${readActionName}`;
export const LOAD_INDEXING_INFO_SUCCESS = `${ACTION_PREFIX} ${readActionName} Success`;
export const LOAD_INDEXING_INFO_FAIL = `${ACTION_PREFIX} ${readActionName} Fail`;

const updateActionName = 'Update Indexing Info Item';
export const UPDATE_INDEXING_INFO_ITEM = `${ACTION_PREFIX} ${updateActionName}`;
export const UPDATE_INDEXING_INFO_ITEM_FAIL = `${ACTION_PREFIX} ${updateActionName} Fail`;

const deleteActionName = 'Remove Indexing Info Item';
export const REMOVE_INDEXING_INFO_ITEM = `${ACTION_PREFIX} ${deleteActionName}`;
export const REMOVE_INDEXING_INFO_ITEM_FAIL = `${ACTION_PREFIX} ${deleteActionName} Fail`;

export class AddIndexingInfoItemAction implements Action {
  readonly type: string = ADD_INDEXING_INFO_ITEM;
  constructor(public readonly payload: { newIndexingInfoItem: NewIndexingInfoItem }) {}
}

export class AddIndexingInfoItemFailAction implements Action {
  readonly type: string = ADD_INDEXING_INFO_ITEM_FAIL;
  constructor(public readonly error: any) {}
}

export class LoadIndexingInfoAction implements Action {
  readonly type: string = LOAD_INDEXING_INFO;
}

export class LoadIndexingInfoSuccessAction implements Action {
  readonly type: string = LOAD_INDEXING_INFO_SUCCESS;
  constructor(public readonly payload: { indexingInfo: IndexingInfo }) {}
}

export class LoadIndexingInfoFailAction implements Action {
  readonly type: string = LOAD_INDEXING_INFO_FAIL;
  constructor(public readonly error: any) {}
}

export class UpdateIndexingInfoItemAction implements Action {
  readonly type: string = UPDATE_INDEXING_INFO_ITEM;
  constructor(public readonly payload: { updatedIndexingInfoItem: UpdatedIndexingInfoItem }) {}
}

export class UpdateIndexingInfoItemFailAction implements Action {
  readonly type: string = UPDATE_INDEXING_INFO_ITEM_FAIL;
  constructor(public readonly error: any) {}
}

export class RemoveIndexingInfoItemAction implements Action {
  readonly type: string = REMOVE_INDEXING_INFO_ITEM;
  constructor(public readonly payload: { indexingInfoItemId: string }) {}
}

export class RemoveIndexingInfoItemFailAction implements Action {
  readonly type: string = REMOVE_INDEXING_INFO_ITEM_FAIL;
  constructor(public readonly error: any) {}
}

export type IndexingInfoAction =
  AddIndexingInfoItemAction |
  AddIndexingInfoItemFailAction |

  LoadIndexingInfoAction |
  LoadIndexingInfoSuccessAction |
  LoadIndexingInfoFailAction |

  UpdateIndexingInfoItemAction |
  UpdateIndexingInfoItemFailAction |

  RemoveIndexingInfoItemAction |
  RemoveIndexingInfoItemFailAction;
