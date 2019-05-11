import { Action } from '@ngrx/store';

import { NewReviewerYear, ReviewerYears, UpdatedReviewerYear } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';

export const ACTION_PREFIX: string = '[Reviewer Years]';

const createActionName = 'Add Reviewer Year';
export const ADD_REVIEWER_YEAR = `${ACTION_PREFIX} ${createActionName}`;
export const ADD_REVIEWER_YEAR_FAIL = `${ACTION_PREFIX} ${createActionName} Fail`;

const readActionName = 'Load Reviewer Years';
export const LOAD_REVIEWER_YEARS = `${ACTION_PREFIX} ${readActionName}`;
export const LOAD_REVIEWER_YEARS_SUCCESS = `${ACTION_PREFIX} ${readActionName} Success`;
export const LOAD_REVIEWER_YEARS_FAIL = `${ACTION_PREFIX} ${readActionName} Fail`;

const updateActionName = 'Update Reviewer Year';
export const UPDATE_REVIEWER_YEAR = `${ACTION_PREFIX} ${updateActionName}`;
export const UPDATE_REVIEWER_YEAR_FAIL = `${ACTION_PREFIX} ${updateActionName} Fail`;

const deleteActionName = 'Remove Reviewer Year';
export const REMOVE_REVIEWER_YEAR = `${ACTION_PREFIX} ${deleteActionName}`;
export const REMOVE_REVIEWER_YEAR_FAIL = `${ACTION_PREFIX} ${deleteActionName} Fail`;

export const RESET_REVIEWER_YEARS_STATE = `${ACTION_PREFIX} Reset state`;

export const ENDPOINT_CALL_FAIL = `${ACTION_PREFIX} Endpoint Call Fail`;

export class AddReviewerYearAction implements Action {
  readonly type: string = ADD_REVIEWER_YEAR;
  constructor(public readonly newReviewerYear: NewReviewerYear) {}
}

export class AddReviewerYearFailAction implements Action {
  readonly type: string = ADD_REVIEWER_YEAR_FAIL;
  constructor(public readonly error: any) {}
}

export class LoadReviewerYearsAction implements Action {
  readonly type: string = LOAD_REVIEWER_YEARS;
  constructor() {}
}

export class LoadReviewerYearsSuccessAction implements Action {
  readonly type: string = LOAD_REVIEWER_YEARS_SUCCESS;
  constructor(public readonly reviewerYears: ReviewerYears) {}
}

export class LoadReviewerYearsFailAction implements Action {
  readonly type: string = LOAD_REVIEWER_YEARS_FAIL;
  constructor(public readonly error: any) {}
}

export class UpdateReviewerYearAction implements Action {
  readonly type: string = UPDATE_REVIEWER_YEAR;
  constructor(public readonly updatedReviewerYear: UpdatedReviewerYear) {}
}

export class UpdateReviewerYearFailAction implements Action {
  readonly type: string = UPDATE_REVIEWER_YEAR_FAIL;
  constructor(public readonly error: any) {}
}

export class RemoveReviewerYearAction implements Action {
  readonly type: string = REMOVE_REVIEWER_YEAR;
  constructor(public readonly reviewerYearId: string) {}
}

export class RemoveReviewerYearFailAction implements Action {
  readonly type: string = REMOVE_REVIEWER_YEAR_FAIL;
  constructor(public readonly error: any) {}
}

export class ResetReviewerYearsStateAction implements Action {
  readonly type: string = RESET_REVIEWER_YEARS_STATE;
}

export class EndpointCallFailAction implements Action {
  readonly type: string = ENDPOINT_CALL_FAIL;
  constructor(public readonly error: any) {}
}

export type ReviewerYearAction =
  AddReviewerYearAction |
  AddReviewerYearFailAction |

  LoadReviewerYearsAction |
  LoadReviewerYearsSuccessAction |
  LoadReviewerYearsFailAction |

  UpdateReviewerYearAction |
  UpdateReviewerYearFailAction |

  RemoveReviewerYearAction |
  RemoveReviewerYearFailAction |

  ResetReviewerYearsStateAction |

  EndpointCallFailAction;
