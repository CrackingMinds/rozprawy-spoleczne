import { ControlValueAccessor, Validator } from '@angular/forms';

import { RawEditorialBoardMember } from 'app/models/editorial-board-member';

export type ListOfControlsControl = ControlValueAccessor & Validator;

export type ListOfControlsData = {} | RawEditorialBoardMember;
