import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject, zip } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as librarySelectors from 'app/admin/pages/library/store/selectors/library.selectors';
import { LibraryState } from 'app/admin/pages/library/store/reducers/library.reducer';

import { CreateIssue, LoadIssues, RemoveIssue, UpdateIssue } from 'app/admin/pages/library/store/actions/issue.actions';
import { CreateArticle, LoadArticles, RemoveArticle } from 'app/admin/pages/library/store/actions/article.actions';

import { Article, ArticleEntity } from 'app/models/article';
import { Issue } from 'app/models/issue';

import { PageNameService } from 'app/shared/services/page.name.service';
import { Utils } from 'app/shared/services/utils';

@Component({
  selector: 'rs-library-editorial',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
  issues: Issue[];
  articles: Article[];

  issuesLoading$: Observable<boolean>;
  articlesLoading$: Observable<boolean>;
  contentLoading$: Observable<boolean>;

  selectedIssue: Issue;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private pageNameService: PageNameService,
              private store: Store<LibraryState>) {
  }

  ngOnInit() {
    this.pageNameService.setPageName('Zarządzanie numerami');

    this.store.select(librarySelectors.getIssues)
        .pipe(
          map((issues: Issue[]) => {
            return Utils.sortIssues(issues);
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((issues: Issue[]) => this.issues = issues);

    this.store.select(librarySelectors.getArticleEntities)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((articles: Article[]) => this.articles = articles);

    this.issuesLoading$ = this.store.select(librarySelectors.getIssuesLoading);
    this.articlesLoading$ = this.store.select(librarySelectors.getArticlesLoading);

    this.initMainSpinnerManager();

    this.store.dispatch(new LoadIssues());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onIssueSelect(issue: Issue): void {
    this.selectedIssue = issue;
    this.store.dispatch(new LoadArticles(issue.id));
  }

  onIssueCreate(issue: Issue): void {
    this.store.dispatch(new CreateIssue(issue));
  }

  onIssueEdit(issue: Issue): void {
    this.store.dispatch(new UpdateIssue(issue));
  }

  onIssueRemove(issue: Issue): void {
    this.store.dispatch(new RemoveIssue(issue.id));
  }

  onCreateArticle(newArticle: ArticleEntity) {
    this.store.dispatch(new CreateArticle(newArticle));
  }

  onArticleDelete(article: Article): void {
    this.store.dispatch(new RemoveArticle(article));
  }

  private initMainSpinnerManager(): void {
    this.contentLoading$ = zip(
      this.issuesLoading$,
      this.articlesLoading$
    ).pipe(
      map((contentLoading: boolean[]) => {
        const issuesLoading = contentLoading[0];
        const articlesLoading = contentLoading[1];
        return issuesLoading && articlesLoading;
      })
    );
  }

}
