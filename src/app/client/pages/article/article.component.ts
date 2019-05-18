import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { allFalsy } from 'app/shared/custom.observable.creators';
import { firstTrue } from 'app/shared/custom.operators';

import { PageComponent } from 'app/client/pages/page.component';
import { Article } from 'app/models/article';
import { Issue } from 'app/models/issue';

import { ARTICLE_ENDPOINT, ArticleEndpoint } from 'app/endpoints/endpoint/article/article.endpoint';
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
              @Inject(ARTICLE_ENDPOINT) private articleEndpoint: ArticleEndpoint) { super(); }

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

  observePageLoaded(): Observable<void> {
    return allFalsy(
      this.issueLoading$,
      this.articleLoading$
    ).pipe(firstTrue());
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
