import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, zip, of } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { IIssue } from 'app/models/issue';
import { IArticle } from 'app/models/article';

import { PageNameService } from 'app/shared/services/page.name.service';
import { ClientContentService } from 'app/client/client.content.service';
import { IssueStringPipe } from 'app/shared/pipes/issue.string.pipe';

import { ArticlesRepository } from 'app/repos/articles.repository';
import { IssuesRepository } from 'app/repos/issues.repository';

@Component({
    selector: 'rs-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit, OnDestroy {

  issue$: Observable<IIssue>;
  articles$: Observable<IArticle[]>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private articlesRepo: ArticlesRepository,
              private issuesRepo: IssuesRepository,
              private issueStringPipe: IssueStringPipe,
              private pageNameService: PageNameService,
              private clientContentService: ClientContentService) {
  }

  ngOnInit() {

    this.issue$ = this.issuesRepo.getIssueForCurrentRoute();
    this.articles$ = of([]);

    this.issue$.subscribe((issue: IIssue) => console.log(issue));

    // const contentLoading$: Observable<boolean> = zip(
    //   this.issuesRepo.getLoading(),
    //   this.articlesRepo.getLoading()
    // ).pipe(
    //   map((contentLoading: boolean[]) => {
    //     const issuesLoading = contentLoading[0];
    //     const articlesLoading = contentLoading[1];
    //     return issuesLoading && articlesLoading;
    //   })
    // );
	//
    // contentLoading$
    //     .pipe(
    //       filter((contentLoading: boolean) => !contentLoading)
    //     )
    //     .subscribe(() => this.clientContentService.emitContentLoaded());

    // this.rootStore.select(getCurrentIssueId)
    //     .pipe(
    //       takeUntil(this.unsubscribe$)
    //     )
    //     .subscribe((issueId: string) => {
    //       this.store.dispatch(new LoadIssue(issueId));
    //     });
	//
    // this.issue$
    //     .pipe(
    //       filter((issue: IIssue) => !!issue),
    //       takeUntil(this.unsubscribe$)
    //     )
    //     .subscribe((issue: IIssue) => {
	//
    //       let pageName: string = this.issueStringPipe.transform(issue);
	//
    //       if (issue.isCurrent) {
    //         pageName = `Bieżący numer | ${pageName}`;
    //       }
    //       this.pageNameService.setPageName(pageName);
	//
    //       this.store.dispatch(new LoadArticles(issue.id));
    //     });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
