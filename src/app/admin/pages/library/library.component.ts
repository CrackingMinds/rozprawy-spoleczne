import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { allFalsy } from 'app/shared/custom.observable.creators';
import { firstTrue } from 'app/shared/custom.operators';

import * as librarySelectors from 'app/admin/pages/library/store/selectors/library.selectors';
import { LibraryState } from 'app/admin/pages/library/store/reducers/library.reducer';

import { CreateIssue, LoadIssues, RemoveIssue, ResetIssuesStateAction, UpdateIssue } from 'app/admin/pages/library/store/actions/issue.actions';
import { CreateArticle, LoadArticles, RemoveArticle, ResetArticlesStateAction, UpdateArticle } from 'app/admin/pages/library/store/actions/article.actions';

import { Article, ArticleEntity, UntypedArticle } from 'app/models/article';
import { Issue } from 'app/models/issue';

import { Utils } from 'app/shared/utils';
import { AdminPageComponent } from 'app/admin/pages/admin.page.component';
import { AdminPagesResolver } from 'app/shared/routing-helpers/admin.pages.resolver';

@Component({
  selector: 'rs-library-editorial',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LibraryComponent extends AdminPageComponent implements OnInit, OnDestroy {
  issues: Issue[];
  articles: Article[];

  readonly issuesLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  readonly articlesLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  contentLoading: boolean = false;

  selectedIssue: Issue;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private store: Store<LibraryState>) { super(); }

  ngOnInit() {

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
        map((articles: Article[]) => {
          return Utils.sortArticles(articles);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((articles: Article[]) => this.articles = articles);

    this.initSpinnerManager();

    this.store.dispatch(new LoadIssues());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.resetState();
  }

  observePageName(): Observable<string> {
    return of(AdminPagesResolver.library().title);
  }

  observePageLoaded(): Observable<void> {
    return allFalsy(
      this.issuesLoading$.asObservable(),
      this.articlesLoading$.asObservable()
    ).pipe(firstTrue());
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

  onCreateArticle(newArticle: ArticleEntity): void {
    this.store.dispatch(new CreateArticle(newArticle));
  }

  onEditArticle(updatedArticle: UntypedArticle): void {
    this.store.dispatch(new UpdateArticle(updatedArticle));
  }

  onArticleDelete(article: Article): void {
    this.store.dispatch(new RemoveArticle(article));
  }

  private initSpinnerManager(): void {
    this.store.select(librarySelectors.getIssuesLoading)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((loading: boolean) => this.issuesLoading$.next(loading));

    this.store.select(librarySelectors.getArticlesLoading)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((loading: boolean) => this.articlesLoading$.next(loading));
  }

  private resetState(): void {
    this.store.dispatch(new ResetIssuesStateAction());
    this.store.dispatch(new ResetArticlesStateAction());
  }

}
