import { Person } from 'app/models/person';
import { Ordered } from 'app/shared/order-utils/ordered';

export type ScientificBoardMemberInstitute = {
  name: string;
  location: string;
};

export type RawScientificBoardMember = {
  person: Person;
  institute: ScientificBoardMemberInstitute;
};

export type ScientificBoardMemberEntity = ScientificBoardMemberBase;

export type ScientificBoardMember = ScientificBoardMemberBase & {
  id: string;
};

export type NewScientificBoardMember = ScientificBoardMemberBase;

export type UpdatedScientificBoardMember = ScientificBoardMember;

type ScientificBoardMemberBase = RawScientificBoardMember & Ordered;
