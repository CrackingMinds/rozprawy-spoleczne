import { createSelector } from '@ngrx/store';

import * as issuesReducer from 'app/repos/ngrx/issues/issues.reducer';
import { AppState, getAppState, getRouterState, RouterStateUrl } from 'app/store/reducers/app.reducers';
import { IIssue } from 'app/models/issue';
import { RouterReducerState } from '@ngrx/router-store';
import { IssueEntities } from 'app/repos/ngrx/issues/issues.reducer';

const getIssuesState = createSelector(getAppState, (state: AppState) => state.issues);
const getIssueEntities = createSelector(getIssuesState, issuesReducer.getIssueEntities);

export const getIssues = createSelector(getIssueEntities, (entities: IssueEntities) => {
  return entitiesToArray(entities);
});

export const getIssuesLoading = createSelector(getIssuesState, issuesReducer.getIssuesLoading);

export const getIssueByRoute = createSelector(
  getIssueEntities,
  getRouterState,
  (entities: issuesReducer.IssueEntities, router: RouterReducerState<RouterStateUrl>): IIssue => {

    if (router.state) {
      const issueId: string = router.state.params.issueId;

      if (issueId) {
        return entities[router.state.params.issueId];
      } else {
        const issues: IIssue[] = entitiesToArray(entities);
        return getCurrentIssue(issues);
      }

    }

    return router.state && entities[router.state.params.issueId];
  }
);

function entitiesToArray(entities: IssueEntities): IIssue[] {
  return Object.keys(entities).map(id => entities[id]);
}

function getCurrentIssue(issues: IIssue[]): IIssue {
  return issues.filter((issue: IIssue) => issue.isCurrent)[0];
}
