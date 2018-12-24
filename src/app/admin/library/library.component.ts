import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject, zip } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

// import {
//   getLibraryArticles,
//   getLibraryArticlesLoading,
//   getLibraryIssues,
//   getLibraryIssuesLoading,
//   LibraryState
// } from 'app/admin/library/store/reducers/library.reducer';
import { CreateIssue, LoadIssues, RemoveIssue, UpdateIssue } from 'app/repos/ngrx/issues/issues.actions';
import { CreateArticle, LoadArticles } from 'app/repos/ngrx/articles/articles.actions';

import { Article, RawArticle } from 'app/models/article';
import { Issue } from 'app/models/issue';

import { PageNameService } from 'app/shared/services/page.name.service';
import { Utilits } from 'app/shared/services/utilits';
import { AppState } from 'app/store/reducers/app.reducers';

@Component({
  selector: 'rs-library-editorial',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
  issues$: Observable<Issue[]>;
  articles$: Observable<Article[]>;

  issuesLoading$: Observable<boolean>;
  articlesLoading$: Observable<boolean>;
  contentLoading$: Observable<boolean>;

  issueMarkedAsCurrent: Issue;

  selectedIssue: Issue;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private pageNameService: PageNameService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    // this.pageNameService.setPageName('Numery');
	//
    // this.issues$ = this.store.select(getIssues)
    //                    .pipe(
    //                      map((issues: Issue[]) => {
    //                        return this.sortIssues(issues);
    //                      })
    //                    );
    // this.issues$
    //     .pipe(
    //       takeUntil(this.unsubscribe$)
    //     )
    //     .subscribe((issues: Issue[]) => {
    //       this.issueMarkedAsCurrent = issues.filter((issue: Issue) => issue.isCurrent)[0];
    //     });
    // this.articles$ = this.store.select(getArticles);
	//
    // this.issuesLoading$ = this.store.select(getIssuesLoading);
    // this.articlesLoading$ = this.store.select(getArticlesLoading);
    // this.contentLoading$ = zip(
    //   this.issuesLoading$,
    //   this.articlesLoading$
    // ).pipe(
    //   map((contentLoading: boolean[]) => {
    //     const issuesLoading = contentLoading[0];
    //     const articlesLoading = contentLoading[1];
    //     return issuesLoading && articlesLoading;
    //   })
    // );
	//
    // this.store.dispatch(new LoadIssues());
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
    if (issue.isCurrent) {
      this.unmarkLastCurrentNumber();
    }
    this.store.dispatch(new CreateIssue(issue));
  }

  onIssueEdit(issue: Issue): void {
    if (issue !== this.issueMarkedAsCurrent && issue.isCurrent) {
      this.unmarkLastCurrentNumber();
    }
    this.store.dispatch(new UpdateIssue(issue));
  }

  onIssueRemove(issue: Issue): void {
    this.store.dispatch(new RemoveIssue(issue));
  }

  onCreateArticle(newArticle: RawArticle) {
    this.store.dispatch(new CreateArticle(newArticle));
  }

  private sortIssues(issues: Issue[]): Issue[] {
    let updatedIssues: Issue[] = [...issues];
    updatedIssues.sort((a: Issue, b: Issue) => {
      if (a.year === b.year) {

        if (a.vol === b.vol) {

          if (a.number === b.number) {
            return 0;
          }
          else {
            return Utilits.sortByValue(a.number, b.number);
          }
        }
        else {
          return Utilits.sortByValue(a.vol, b.vol);
        }
      }
      else {
        return Utilits.sortByValue(a.year, b.year);
      }
    });

    return updatedIssues;
  }

  private unmarkLastCurrentNumber(): void {
    this.store.dispatch(new UpdateIssue({
      ...this.issueMarkedAsCurrent,
      isCurrent: false
    }));
  }

}
