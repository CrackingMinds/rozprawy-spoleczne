import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, zip } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import {
  getCurrentIssueId,
  getIssue,
  getIssueLoading,
  getIssuePageArticles,
  getIssuePageArticlesLoading,
  IssuePageState
} from 'app/client/pages/issue/store/issue.page.reducers';
import { LoadIssue } from 'app/store/actions/issue.actions';
import { LoadArticles } from 'app/store/actions/articles.actions';

import { IIssue } from 'app/models/issue';
import { IArticle } from 'app/models/article';

import { PageNameService } from 'app/shared/services/page.name.service';
import { ClientContentService } from 'app/client/client.content.service';
import { IssueStringPipe } from 'app/shared/pipes/issue.string.pipe';

import { RouterStateUrl } from 'app/store/reducers/app.reducers';

@Component({
    selector: 'rs-issue',
    templateUrl: './issue.component.html'
})
export class IssueComponent implements OnInit, OnDestroy {

  issue$: Observable<IIssue>;
  articles$: Observable<IArticle[]>;

  issueLoading$: Observable<boolean>;
  articlesLoading$: Observable<boolean>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<IssuePageState>,
              private rootStore: Store<RouterStateUrl>,
              private issueStringPipe: IssueStringPipe,
              private pageNameService: PageNameService,
              private clientContentService: ClientContentService) {
  }

  ngOnInit() {

    this.issue$ = this.store.select(getIssue);
    this.articles$ = this.store.select(getIssuePageArticles);

    this.issueLoading$ = this.store.select(getIssueLoading);
    this.articlesLoading$ = this.store.select(getIssuePageArticlesLoading);

    const contentLoading$ = zip(
      this.issueLoading$,
      this.articlesLoading$
    ).pipe(
      map((contentLoading: boolean[]) => {
        const issuesLoading = contentLoading[0];
        const articlesLoading = contentLoading[1];
        return issuesLoading && articlesLoading;
      })
    );

    contentLoading$
        .pipe(
          filter((contentLoading: boolean) => !contentLoading)
        )
        .subscribe(() => this.clientContentService.emitContentLoaded());

    this.rootStore.select(getCurrentIssueId)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((issueId: string) => {
          this.store.dispatch(new LoadIssue(issueId));
        });

    this.issue$
        .pipe(
          filter((issue: IIssue) => !!issue),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((issue: IIssue) => {

          let pageName: string = this.issueStringPipe.transform(issue);

          if (issue.isCurrent) {
            pageName = `Bieżący numer | ${pageName}`;
          }
          this.pageNameService.setPageName(pageName);

          this.store.dispatch(new LoadArticles(issue.id));
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
