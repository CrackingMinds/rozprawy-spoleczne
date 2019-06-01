import { Action } from '@ngrx/store';

import { NewReviewer, Reviewers, UpdatedReviewer } from 'app/models/reviewer';
import { OrderChanges } from 'app/shared/order-utils/change/order.change';

export const ACTION_PREFIX: string = '[Reviewers]';

const createActionName = 'Add Reviewer';
export const ADD_REVIEWER = `${ACTION_PREFIX} ${createActionName}`;
export const ADD_REVIEWER_FAIL = `${ACTION_PREFIX} ${createActionName} Fail`;

const readActionName = 'Load Reviewers';
export const LOAD_REVIEWERS = `${ACTION_PREFIX} ${readActionName}`;
export const LOAD_REVIEWERS_SUCCESS = `${ACTION_PREFIX} ${readActionName} Success`;
export const LOAD_REVIEWERS_FAIL = `${ACTION_PREFIX} ${readActionName} Fail`;

const updateActionName = 'Update Reviewer';
export const UPDATE_REVIEWER = `${ACTION_PREFIX} ${updateActionName}`;
export const UPDATE_REVIEWER_FAIL = `${ACTION_PREFIX} ${updateActionName} Fail`;

const deleteActionName = 'Remove Reviewer';
export const REMOVE_REVIEWER = `${ACTION_PREFIX} ${deleteActionName}`;
export const REMOVE_REVIEWER_FAIL = `${ACTION_PREFIX} ${deleteActionName} Fail`;

export const CHANGE_ORDER = `${ACTION_PREFIX} Change order`;

export const RESET_REVIEWERS_STATE = `${ACTION_PREFIX} Reset state`;

export const ENDPOINT_CALL_FAIL = `${ACTION_PREFIX} Endpoint Call Fail`;

export class AddReviewerAction implements Action {
  readonly type: string = ADD_REVIEWER;
  constructor(public readonly newReviewerData: NewReviewer) {}
}

export class AddReviewerFailAction implements Action {
  readonly type: string = ADD_REVIEWER_FAIL;
  constructor(public readonly error: any) {}
}

export class LoadReviewersAction implements Action {
  readonly type: string = LOAD_REVIEWERS;
  constructor(public readonly payload: { reviewerYearId: string }) {}
}

export class LoadReviewersSuccessAction implements Action {
  readonly type: string = LOAD_REVIEWERS_SUCCESS;
  constructor(public readonly reviewers: Reviewers) {}
}

export class LoadReviewersFailAction implements Action {
  readonly type: string = LOAD_REVIEWERS_FAIL;
  constructor(public readonly error: any) {}
}

export class UpdateReviewerAction implements Action {
  readonly type: string = UPDATE_REVIEWER;
  constructor(public readonly updatedReviewerData: UpdatedReviewer) {}
}

export class UpdateReviewerFailAction implements Action {
  readonly type: string = UPDATE_REVIEWER_FAIL;
  constructor(public readonly error: any) {}
}

export class RemoveReviewerAction implements Action {
  readonly type: string = REMOVE_REVIEWER;
  constructor(public readonly payload: {
    reviewerId: string,
    yearId: string,
    orderChanges: OrderChanges
  }) {}
}

export class RemoveReviewerFailAction implements Action {
  readonly type: string = REMOVE_REVIEWER_FAIL;
  constructor(public readonly error: any) {}
}

export class ChangeOrderAction implements Action {
  readonly type: string = CHANGE_ORDER;
  constructor(public readonly payload: { orderChanges: OrderChanges, yearId: string }) {}
}

export class ResetReviewersStateAction implements Action {
  readonly type: string = RESET_REVIEWERS_STATE;
}

export class EndpointCallFailAction implements Action {
  readonly type: string = ENDPOINT_CALL_FAIL;
  constructor(public readonly error: any) {}
}

export type ReviewerAction =
  AddReviewerAction |
  AddReviewerFailAction |

  LoadReviewersAction |
  LoadReviewersSuccessAction |
  LoadReviewersFailAction |

  UpdateReviewerAction |
  UpdateReviewerFailAction |

  RemoveReviewerAction |
  RemoveReviewerFailAction |

  ChangeOrderAction |

  ResetReviewersStateAction |

  EndpointCallFailAction;
