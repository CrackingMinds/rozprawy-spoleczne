import { IContactData } from 'app/models/contact-data';
import { ContactInfoActions, LOAD_CONTACT_INFO, LOAD_CONTACT_INFO_FAIL, LOAD_CONTACT_INFO_SUCCESS } from 'app/store/actions/contact.info.actions';

export interface ContactInfoState {
  data: IContactData;
  loaded: boolean;
  loading: boolean;
}

const initialState: ContactInfoState = {
  data: null,
  loaded: false,
  loading: true
};

export function contactInfoReducer(state = initialState, action: ContactInfoActions): ContactInfoState {

  switch (action.type) {

    case LOAD_CONTACT_INFO: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_CONTACT_INFO_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data
      };
    }

    case LOAD_CONTACT_INFO_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

  }

  return state;
}

export const getContactInfo = (state: ContactInfoState) => state.data;
export const getContactInfoLoading = (state: ContactInfoState) => state.loading;
export const getContactInfoLoaded = (state: ContactInfoState) => state.loaded;
