import { Person } from 'app/models/person';
import { Sortable } from 'app/models/sortable';

export type EditorialBoardMemberPosition = string;

type EditorialBoardMemberBase = RawEditorialBoardMember & Sortable;

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
