import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable, Subject, zip } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { Page } from 'app/pages/page';
import { Article } from 'app/models/article';
import { Issue } from 'app/models/issue';

import { ArticleEndpoint } from 'app/endpoints/endpoint/article/article.endpoint';
import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';

@Component({
  selector: 'rs-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent extends Page implements OnInit, OnDestroy {

  issue: Issue;
  article: Article;

  private pageName$: Subject<string> = new Subject<string>();
  private issueLoaded$: Subject<void> = new Subject<void>();
  private articleLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private issueEndpoint: IssueEndpoint,
              private articleEndpoint: ArticleEndpoint) { super(); }

  ngOnInit() {

    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params: Params) => {
        const articleId: string = params.articleId;
        this.fetchArticleData(articleId);
      });

  }

  ngOnDestroy() {

    this.pageName$.complete();
    this.issueLoaded$.complete();
    this.articleLoaded$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoaded(): Observable<void> {

    return zip(
      this.issueLoaded$,
      this.articleLoaded$
    ).pipe(
      map(() => null)
    );
  }

  observePageName(): Observable<string> {
    return this.pageName$.asObservable();
  }

  private fetchArticleData(articleId: string): void {
    this.articleEndpoint.getArticle(articleId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((article: Article) => {
        this.pageName$.next(article.title);

        this.article = article;
        this.articleLoaded$.next();

        this.fetchIssue(article.issueId);
      });
  }

  private fetchIssue(issueId: string): void {
    this.issueEndpoint.getIssue(issueId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((issue: Issue) => {
        this.issue = issue;
        this.issueLoaded$.next();
      });
  }

}
