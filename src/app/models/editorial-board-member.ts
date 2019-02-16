import { Person } from 'app/models/person';
import { Sortable } from 'app/models/sortable';

export type EditorialBoardMemberPosition = string;

type EditorialBoardMemberBase = {
  person: Person;
  position: EditorialBoardMemberPosition;
} & Sortable;

export type EditorialBoardMemberEntity = EditorialBoardMemberBase;

export type EditorialBoardMember = EditorialBoardMemberBase & {
  id: string;
}

export type RawEditorialBoardMember = EditorialBoardMemberBase;
