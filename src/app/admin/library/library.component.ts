import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject, zip } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import {
  getLibraryArticles,
  getLibraryArticlesLoading,
  getLibraryIssues,
  getLibraryIssuesLoading,
  LibraryState
} from 'app/admin/library/store/reducers/library.reducer';
import { CreateIssue, LoadIssues, RemoveIssue, UpdateIssue } from 'app/store/actions/issues.actions';
import { CreateArticle, LoadArticles } from 'app/store/actions/articles.actions';

import { IArticle, RawArticleWithTypeId } from 'app/models/article';
import { IIssue } from 'app/models/issue';

import { PageNameService } from 'app/shared/services/page.name.service';
import { Utilits } from 'app/shared/services/utilits';

@Component({
  selector: 'rs-library-editorial',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
  issues$: Observable<IIssue[]>;
  articles$: Observable<IArticle[]>;

  issuesLoading$: Observable<boolean>;
  articlesLoading$: Observable<boolean>;
  contentLoading$: Observable<boolean>;

  issueMarkedAsCurrent: IIssue;

  selectedIssue: IIssue;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private pageNameService: PageNameService,
              private store: Store<LibraryState>) {
  }

  ngOnInit() {
    this.pageNameService.setPageName('Numery');

    this.issues$ = this.store.select(getLibraryIssues)
                       .pipe(
                         map((issues: IIssue[]) => {
                           return this.sortIssues(issues);
                         })
                       );
    this.issues$
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((issues: IIssue[]) => {
          this.issueMarkedAsCurrent = issues.filter((issue: IIssue) => issue.isCurrent)[0];
        });
    this.articles$ = this.store.select(getLibraryArticles);

    this.issuesLoading$ = this.store.select(getLibraryIssuesLoading);
    this.articlesLoading$ = this.store.select(getLibraryArticlesLoading);
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

    this.store.dispatch(new LoadIssues());
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onIssueSelect(issue: IIssue): void {
    this.selectedIssue = issue;
    this.store.dispatch(new LoadArticles(issue.id));
  }

  onIssueCreate(issue: IIssue): void {
    if (issue.isCurrent) {
      this.unmarkLastCurrentNumber();
    }
    this.store.dispatch(new CreateIssue(issue));
  }

  onIssueEdit(issue: IIssue): void {
    if (issue !== this.issueMarkedAsCurrent && issue.isCurrent) {
      this.unmarkLastCurrentNumber();
    }
    this.store.dispatch(new UpdateIssue(issue));
  }

  onIssueRemove(issue: IIssue): void {
    this.store.dispatch(new RemoveIssue(issue));
  }

  onCreateArticle(newArticle: RawArticleWithTypeId) {
    this.store.dispatch(new CreateArticle(newArticle));
  }

  private sortIssues(issues: IIssue[]): IIssue[] {
    let updatedIssues: IIssue[] = [...issues];
    updatedIssues.sort((a: IIssue, b: IIssue) => {
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
