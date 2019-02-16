import { Action } from '@ngrx/store';

import { ACTION_PREFIX } from 'app/admin/pages/editorial-board/store/actions/action.prefix';
import { EditorialBoardMember, RawEditorialBoardMember } from 'app/models/editorial-board-member';

const createActionName = 'Add Editorial Board Member';
export const ADD_EDITORIAL_BOARD_MEMBER = `${ACTION_PREFIX} ${createActionName}`;
export const ADD_EDITORIAL_BOARD_MEMBER_FAIL = `${ACTION_PREFIX} ${createActionName} Fail`;

const readActionName = 'Load Editorial Board';
export const LOAD_EDITORIAL_BOARD = `${ACTION_PREFIX} ${readActionName}`;
export const LOAD_EDITORIAL_BOARD_SUCCESS = `${ACTION_PREFIX} ${readActionName} Success`;
export const LOAD_EDITORIAL_BOARD_FAIL = `${ACTION_PREFIX} ${readActionName} Fail`;

const updateActionName = 'Update Editorial Board Member';
export const UPDATE_EDITORIAL_BOARD_MEMBER = `${ACTION_PREFIX} ${updateActionName}`;
export const UPDATE_EDITORIAL_BOARD_MEMBER_FAIL = `${ACTION_PREFIX} ${updateActionName} Fail`;

const deleteActionName = 'Remove Editorial Board Member';
export const REMOVE_EDITORIAL_BOARD_MEMBER = `${ACTION_PREFIX} ${deleteActionName}`;
export const REMOVE_EDITORIAL_BOARD_MEMBER_FAIL = `${ACTION_PREFIX} ${deleteActionName} Fail`;

export class AddEditorialBoardMember implements Action {
  readonly type: string = ADD_EDITORIAL_BOARD_MEMBER;
  constructor(public readonly memberData: RawEditorialBoardMember) {}
}

export class AddEditorialBoardMemberFail implements Action {
  readonly type: string = ADD_EDITORIAL_BOARD_MEMBER_FAIL;
  constructor(public readonly error: any) {}
}

export class LoadEditorialBoard implements Action {
  readonly type: string = LOAD_EDITORIAL_BOARD;
  constructor() {}
}

export class LoadEditorialBoardSuccess implements Action {
  readonly type: string = LOAD_EDITORIAL_BOARD_SUCCESS;
  constructor(public readonly editorialBoard: EditorialBoardMember[]) {}
}

export class LoadEditorialBoardFail implements Action {
  readonly type: string = LOAD_EDITORIAL_BOARD_FAIL;
  constructor(public readonly error: any) {}
}

export class UpdateEditorialBoardMember implements Action {
  readonly type: string = UPDATE_EDITORIAL_BOARD_MEMBER;
  constructor(public readonly memberData: EditorialBoardMember) {}
}

export class UpdateEditorialBoardMemberFail implements Action {
  readonly type: string = UPDATE_EDITORIAL_BOARD_MEMBER_FAIL;
  constructor(public readonly error: any) {}
}

export class RemoveEditorialBoardMember implements Action {
  readonly type: string = REMOVE_EDITORIAL_BOARD_MEMBER;
  constructor(public readonly memberId: string) {}
}

export class RemoveEditorialBoardMemberFail implements Action {
  readonly type: string = REMOVE_EDITORIAL_BOARD_MEMBER_FAIL;
  constructor(public readonly error: any) {}
}

export type EditorialBoardAction =
  AddEditorialBoardMember |
  AddEditorialBoardMemberFail |

  LoadEditorialBoard |
  LoadEditorialBoardSuccess |
  LoadEditorialBoardFail |

  UpdateEditorialBoardMember |
  UpdateEditorialBoardMemberFail |

  RemoveEditorialBoardMember |
  RemoveEditorialBoardMemberFail;

