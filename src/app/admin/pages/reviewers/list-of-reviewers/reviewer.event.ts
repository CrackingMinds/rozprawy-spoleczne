import { NewReviewer, UpdatedReviewer } from 'app/models/reviewer';
import { OrderChanges } from 'app/shared/order-utils/change/order.change';

export interface ReviewerEvent {
  type: ReviewerEventType;
  payload: any;
}

export enum ReviewerEventType {
  CREATE,
  UPDATE,
  REMOVE,
  ORDER_CHANGE
}

export class ReviewerCreateEvent implements ReviewerEvent {
  readonly type = ReviewerEventType.CREATE;
  constructor(public readonly payload: NewReviewer) {}
}

export class ReviewerUpdateEvent implements ReviewerEvent {
  readonly type = ReviewerEventType.UPDATE;
  constructor(public readonly payload: UpdatedReviewer) {}
}

export class ReviewerRemoveEvent implements ReviewerEvent {
  readonly type = ReviewerEventType.REMOVE;
  constructor(public readonly payload: ReviewerRemoveEventPayload) {}
}

export class ReviewersOrderChange implements ReviewerEvent {
  readonly type = ReviewerEventType.ORDER_CHANGE;
  constructor(public readonly payload: { orderChanges: OrderChanges }) {}
}

export type ReviewerRemoveEventPayload = {
  reviewerId: string;
  orderChanges: OrderChanges;
};
