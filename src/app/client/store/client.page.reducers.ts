import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { contactInfoReducer, ContactInfoState, getContactInfo, getContactInfoLoading } from 'app/store/reducers/contact.info.reducers';
import { IndexingInfoState, indexingInfoReducer, getIndexingInfo, getIndexingInfoLoading } from 'app/store/reducers/indexing.info.reducers';

export interface ClientPageState {
  contactInfo: ContactInfoState;
  indexingInfo: IndexingInfoState;
}

export const clientPageReducers: ActionReducerMap<ClientPageState> = {
  contactInfo: contactInfoReducer,
  indexingInfo: indexingInfoReducer
};

export const getClientPageState = createFeatureSelector<ClientPageState>('clientPage');

const getContactInfoState = createSelector(getClientPageState, (state: ClientPageState) => state.contactInfo);
export const getClientPageContactInfo = createSelector(getContactInfoState, getContactInfo);
export const getClientPageContactInfoLoading = createSelector(getContactInfoState, getContactInfoLoading);

const getIndexingInfoState = createSelector(getClientPageState, (state: ClientPageState) => state.indexingInfo);
export const getClientPageIndexingInfo = createSelector(getIndexingInfoState, getIndexingInfo);
export const getClientPageIndexingInfoLoading = createSelector(getIndexingInfoState, getIndexingInfoLoading);
