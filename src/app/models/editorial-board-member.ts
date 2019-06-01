import { Person } from 'app/models/person';
import { Ordered } from 'app/shared/order-utils/ordered';

export type EditorialBoardMemberPosition = string;

type EditorialBoardMemberBase = RawEditorialBoardMember & Ordered;

export type RawEditorialBoardMember = {
  person: Person;
  position: EditorialBoardMemberPosition;
};

export type EditorialBoardMemberEntity = EditorialBoardMemberBase;

export type EditorialBoardMember = EditorialBoardMemberBase & {
  id: string;
}

export type NewEditorialBoardMember = EditorialBoardMemberBase;

export type UpdatedEditorialBoardMember = EditorialBoardMember;
