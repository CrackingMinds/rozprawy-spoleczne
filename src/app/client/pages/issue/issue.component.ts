import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable, Subject, zip } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { Issue } from 'app/models/issue';
import { Article } from 'app/models/article';
import { IssueStringPipe } from 'app/shared/pipes/issue.string.pipe';
import { Page } from 'app/pages/page';

import { ArticleEndpoint } from 'app/endpoints/endpoint/article/article.endpoint';
import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';

@Component({
    selector: 'rs-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.scss']
})
export class IssueComponent extends Page implements OnInit, OnDestroy {

  issue: Issue;
  issueArticles: Article[];

  private pageName$: Subject<string> = new Subject<string>();

  private issueLoaded$: Subject<void> = new Subject<void>();
  private issueArticlesLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private issueEndpoint: IssueEndpoint,
              private articleEndpoint: ArticleEndpoint,
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

    this.issueLoaded$.complete();
    this.issueArticlesLoaded$.complete();
  }

  observeContentLoaded(): Observable<void> {

    return zip(
      this.issueLoaded$,
      this.issueArticlesLoaded$
    ).pipe(
      map(() => null)
    );
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
          this.issueLoaded$.next();

          this.fetchArticles(issue.id);
        });
  }

  private fetchArticles(issueId: string): void {
    this.articleEndpoint.getIssueArticles(issueId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((articles: Article[]) => {
          this.issueArticles = articles;
          this.issueArticlesLoaded$.next();
        });
  }

}
