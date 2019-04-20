import { Person } from 'app/models/person';
import { Sortable } from 'app/models/sortable';

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
} & Sortable;
