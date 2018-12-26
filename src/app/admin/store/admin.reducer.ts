import { ActionReducerMap } from '@ngrx/store';

export interface AdminState {}

export const adminReducer: ActionReducerMap<AdminState> = {};

export const getAdminState = (state: AdminState) => state;
