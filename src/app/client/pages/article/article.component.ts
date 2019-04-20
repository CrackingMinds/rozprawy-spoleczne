import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { PageComponent } from 'app/client/pages/page.component';
import { Article } from 'app/models/article';
import { Issue } from 'app/models/issue';

import { ArticleEndpoint } from 'app/endpoints/endpoint/article/article.endpoint';
import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';

@Component({
  selector: 'rs-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent extends PageComponent implements OnInit, OnDestroy {

  issue: Issue;
  article: Article;

  private readonly pageName$: Subject<string> = new Subject<string>();

  private readonly issueLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private readonly articleLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

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

    this.issueLoading$.complete();
    this.articleLoading$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoading(): Observable<boolean> {
    return combineLatest(
      this.issueLoading$,
      this.articleLoading$
    ).pipe(
      map((data: Array<boolean>) => {
        const issueLoading = data[0];
        const articleLoading = data[1];

        return issueLoading || articleLoading;
      })
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
        this.articleLoading$.next(false);

        this.fetchIssue(article.issueId);
      });
  }

  private fetchIssue(issueId: string): void {
    this.issueEndpoint.getIssue(issueId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((issue: Issue) => {
        this.issue = issue;
        this.issueLoading$.next(false);
      });
  }

}
