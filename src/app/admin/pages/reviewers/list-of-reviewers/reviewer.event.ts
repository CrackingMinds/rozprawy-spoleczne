import { NewReviewer, UpdatedReviewer } from 'app/models/reviewer';

export interface ReviewerEvent {
  type: ReviewerEventType;
  payload: any;
}

export enum ReviewerEventType {
  CREATE,
  UPDATE,
  REMOVE
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

export type ReviewerRemoveEventPayload = {
  reviewerId: string;
};
