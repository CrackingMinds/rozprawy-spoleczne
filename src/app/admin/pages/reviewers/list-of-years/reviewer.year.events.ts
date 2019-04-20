import { NewReviewerYear, UpdatedReviewerYear } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';

export interface ReviewerYearEvent {
  type: ReviewerYearEventType;
  payload: any;
}

export enum ReviewerYearEventType {
  ADD,
  UPDATE,
  REMOVE,
  SELECT
}

export class ReviewerYearAddEvent implements ReviewerYearEvent {
  readonly type: ReviewerYearEventType = ReviewerYearEventType.ADD;
  constructor(public readonly payload: NewReviewerYear) {}
}

export class ReviewerYearUpdateEvent implements ReviewerYearEvent {
  readonly type: ReviewerYearEventType = ReviewerYearEventType.UPDATE;
  constructor(public readonly payload: UpdatedReviewerYear) {}
}

export class ReviewerYearRemoveEvent implements ReviewerYearEvent {
  readonly type: ReviewerYearEventType = ReviewerYearEventType.REMOVE;
  constructor(public readonly payload: { id: string }) {}
}

export class ReviewerYearSelectEvent implements ReviewerYearEvent {
  readonly type: ReviewerYearEventType = ReviewerYearEventType.SELECT;
  constructor(public readonly payload: { id: string }) {}
}
