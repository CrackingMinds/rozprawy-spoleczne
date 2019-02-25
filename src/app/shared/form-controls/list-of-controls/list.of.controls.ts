import { ControlValueAccessor, Validator } from '@angular/forms';

import { RawEditorialBoardMember } from 'app/models/editorial-board-member';

export type ListOfControlsControl = ControlValueAccessor & Validator;

export type ListOfControlsValueUpdate<T> = {
  controlIndex: number;
  controlValue: T;
};

export type ListOfControlsValueCreate<T> = {
  controlIndex: number;
  controlValue: T;
}

export type ListOfControlsValueRemove = {
  controlIndex: number;
};
