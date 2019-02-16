import { ControlValueAccessor, Validator } from '@angular/forms';

import { RawEditorialBoardMember } from 'app/models/editorial-board-member';

export type ListOfControlsControl = ControlValueAccessor & Validator;

export type ListOfControlsData = {} | RawEditorialBoardMember;

export type ListOfControlsValueUpdate = {
  controlIndex: number;
  controlValue: any;
};

export type ListOfControlsValueCreate = {
  controlIndex: number;
  controlValue: any;
}

export type ListOfControlsValueRemove = {
  controlIndex: number;
};
