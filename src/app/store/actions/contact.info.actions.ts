import { Action } from '@ngrx/store';

import { IContactData } from 'app/models/contact-data';

export const LOAD_CONTACT_INFO = '[Contact Info] Load contact info';
export const LOAD_CONTACT_INFO_SUCCESS = '[Contact Info] Load contact info success';
export const LOAD_CONTACT_INFO_FAIL = '[Contact Info] Load contact info fail';

export class LoadContactInfo implements Action {
  readonly type: string = LOAD_CONTACT_INFO;
  constructor(public payload?: any) {}
}

export class LoadContactInfoSuccess implements Action {
  readonly type: string = LOAD_CONTACT_INFO_SUCCESS;
  constructor(public payload: IContactData) {}
}

export class LoadContactInfoFail implements Action {
  readonly type: string = LOAD_CONTACT_INFO_FAIL;
  constructor(public payload: any) {}
}

export type ContactInfoActions =
  LoadContactInfo |
  LoadContactInfoSuccess |
  LoadContactInfoFail;
