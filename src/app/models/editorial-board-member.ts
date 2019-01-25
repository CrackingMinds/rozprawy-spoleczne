import { Person } from 'app/models/person';

export type EditorialBoardMemberPosition = string;

type EditorialBoardMemberBase = Person & {
  position: EditorialBoardMemberPosition;
}

export type EditorialBoardMember = EditorialBoardMemberBase & {
  id: string;
}

export type RawEditorialBoardMember = EditorialBoardMemberBase;
