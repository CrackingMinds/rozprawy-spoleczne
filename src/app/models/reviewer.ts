import { Person } from 'app/models/person';
import { Ordered } from 'app/shared/order-utils/ordered';

export type ReviewerEntity = ReviewerBase;

export type Reviewer = ReviewerBase & {
  id: string;
};

export type Reviewers = Array<Reviewer>;

export type NewReviewer = ReviewerBase;

export type UpdatedReviewer = Reviewer;

export type ReviewerControlData = {
  person: Person;
  title: string;
  additionalInfo?: string;
};

type ReviewerBase = ReviewerControlData & {
  yearId: string;
} & Ordered;
