import { Action } from '@ngrx/store';

import { ACTION_PREFIX } from 'app/admin/pages/scientific-board/store/actions/action.prefix';
import { NewScientificBoardMember, UpdatedScientificBoardMember } from 'app/models/scientific-board-member';
import { ScientificBoard } from 'app/models/scientific.board';

const createActionName = 'Add Scientific Board Member';
export const ADD_SCIENTIFIC_BOARD_MEMBER = `${ACTION_PREFIX} ${createActionName}`;
export const ADD_SCIENTIFIC_BOARD_MEMBER_FAIL = `${ACTION_PREFIX} ${createActionName} Fail`;

const readActionName = 'Load Scientific Board';
export const LOAD_SCIENTIFIC_BOARD = `${ACTION_PREFIX} ${readActionName}`;
export const LOAD_SCIENTIFIC_BOARD_SUCCESS = `${ACTION_PREFIX} ${readActionName} Success`;
export const LOAD_SCIENTIFIC_BOARD_FAIL = `${ACTION_PREFIX} ${readActionName} Fail`;

const updateActionName = 'Update Scientific Board Member';
export const UPDATE_SCIENTIFIC_BOARD_MEMBER = `${ACTION_PREFIX} ${updateActionName}`;
export const UPDATE_SCIENTIFIC_BOARD_MEMBER_FAIL = `${ACTION_PREFIX} ${updateActionName} Fail`;

const deleteActionName = 'Remove Scientific Board Member';
export const REMOVE_SCIENTIFIC_BOARD_MEMBER = `${ACTION_PREFIX} ${deleteActionName}`;
export const REMOVE_SCIENTIFIC_BOARD_MEMBER_FAIL = `${ACTION_PREFIX} ${deleteActionName} Fail`;

export const ENDPOINT_CALL_FAIL = `${ACTION_PREFIX} Endpoint Call Fail`;

export class AddScientificBoardMember implements Action {
  readonly type: string = ADD_SCIENTIFIC_BOARD_MEMBER;
  constructor(public readonly memberData: NewScientificBoardMember) {}
}

export class AddScientificBoardMemberFail implements Action {
  readonly type: string = ADD_SCIENTIFIC_BOARD_MEMBER_FAIL;
  constructor(public readonly error: any) {}
}

export class LoadScientificBoard implements Action {
  readonly type: string = LOAD_SCIENTIFIC_BOARD;
  constructor() {}
}

export class LoadScientificBoardSuccess implements Action {
  readonly type: string = LOAD_SCIENTIFIC_BOARD_SUCCESS;
  constructor(public readonly scientificBoard: ScientificBoard) {}
}

export class LoadScientificBoardFail implements Action {
  readonly type: string = LOAD_SCIENTIFIC_BOARD_FAIL;
  constructor(public readonly error: any) {}
}

export class UpdateScientificBoardMember implements Action {
  readonly type: string = UPDATE_SCIENTIFIC_BOARD_MEMBER;
  constructor(public readonly memberData: UpdatedScientificBoardMember) {}
}

export class UpdateScientificBoardMemberFail implements Action {
  readonly type: string = UPDATE_SCIENTIFIC_BOARD_MEMBER_FAIL;
  constructor(public readonly error: any) {}
}

export class RemoveScientificBoardMember implements Action {
  readonly type: string = REMOVE_SCIENTIFIC_BOARD_MEMBER;
  constructor(public readonly memberId: string) {}
}

export class RemoveScientificBoardMemberFail implements Action {
  readonly type: string = REMOVE_SCIENTIFIC_BOARD_MEMBER_FAIL;
  constructor(public readonly error: any) {}
}

export class EndpointCallFailAction implements Action {
  readonly type: string = ENDPOINT_CALL_FAIL;
  constructor(public readonly error: any) {}
}

export type ScientificBoardAction =
  AddScientificBoardMember |
  AddScientificBoardMemberFail |

  LoadScientificBoard |
  LoadScientificBoardSuccess |
  LoadScientificBoardFail |

  UpdateScientificBoardMember |
  UpdateScientificBoardMemberFail |

  RemoveScientificBoardMember |
  RemoveScientificBoardMemberFail |

  EndpointCallFailAction;
