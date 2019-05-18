import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable, Subject, ReplaySubject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { allFalsy } from 'app/shared/custom.observable.creators';
import { firstTrue } from 'app/shared/custom.operators';

import { Issue } from 'app/models/issue';
import { Article } from 'app/models/article';
import { IssueStringPipe } from 'app/shared/pipes/issue.string.pipe';
import { PageComponent } from 'app/client/pages/page.component';

import { ARTICLE_ENDPOINT, ArticleEndpoint } from 'app/endpoints/endpoint/article/article.endpoint';
import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';
import { Utils } from 'app/shared/utils';

@Component({
    selector: 'rs-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.scss']
})
export class IssueComponent extends PageComponent implements OnInit, OnDestroy {

  issue: Issue;
  issueArticles: Article[];

  private readonly pageName$: Subject<string> = new Subject<string>();

  private readonly issueLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  private readonly issueArticlesLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private issueEndpoint: IssueEndpoint,
              @Inject(ARTICLE_ENDPOINT) private articleEndpoint: ArticleEndpoint,
              private issueStringPipe: IssueStringPipe) { super(); }

  ngOnInit() {

    this.route.params
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((params: Params) => {
          const issueId: string = params.issueId;
          this.fetchIssueAndArticles(issueId);
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.pageName$.complete();

    this.issueLoading$.complete();
    this.issueArticlesLoading$.complete();
  }

  observePageLoaded(): Observable<void> {
    return allFalsy(
      this.issueLoading$,
      this.issueArticlesLoading$
    ).pipe(firstTrue());
  }

  observePageName(): Observable<string> {
    return this.pageName$.asObservable();
  }

  private fetchIssueAndArticles(issueId: string): void {

    let issue$: Observable<Issue>;

    if (issueId) {
      issue$ = this.issueEndpoint.getIssue(issueId);
    } else {
      issue$ = this.issueEndpoint.getCurrentIssue();
    }

    issue$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((issue: Issue) => {
          let pageName: string = this.issueStringPipe.transform(issue);

          if (issue.isCurrent)
            pageName = `Bieżący numer | ${pageName}`;

          this.pageName$.next(pageName);

          this.issue = issue;
          this.issueLoading$.next(false);

          this.fetchArticles(issue.id);
        });
  }

  private fetchArticles(issueId: string): void {
    this.articleEndpoint.getIssueArticles(issueId)
        .pipe(
          map((articles: Article[]) => {
            return Utils.sortArticles(articles);
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((articles: Article[]) => {
          this.issueArticles = articles;
          this.issueArticlesLoading$.next(false);
        });
  }

}
