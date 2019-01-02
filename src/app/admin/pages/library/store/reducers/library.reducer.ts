import { ActionReducerMap } from '@ngrx/store';

import { IssuesState } from 'app/admin/pages/library/store/reducers/issue.reducer';
import { ArticlesState } from 'app/admin/pages/library/store/reducers/article.reducer';

import * as articleReducer from 'app/admin/pages/library/store/reducers/article.reducer';
import * as issueReducer from 'app/admin/pages/library/store/reducers/issue.reducer';

export interface LibraryState {
  issues: IssuesState;
  articles: ArticlesState;
}

export const libraryReducers: ActionReducerMap<LibraryState> = {
  issues: issueReducer.reducer,
  articles: articleReducer.reducer
};
