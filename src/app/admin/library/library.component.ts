import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { getLibraryArticles, getLibraryArticlesLoading, getLibraryIssues, LibraryState } from 'app/admin/library/store/reducers/library.reducer';
import { CreateIssue, LoadIssues, RemoveIssue, UpdateIssue } from 'app/store/actions/issues.actions';
import { LoadArticles } from 'app/store/actions/articles.actions';

import { IArticle } from 'app/models/article';
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

  articlesLoading$: Observable<boolean>;

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

    this.articlesLoading$ = this.store.select(getLibraryArticlesLoading);

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
    this.store.dispatch(new CreateIssue(issue));
  }

  onIssueEdit(issue: IIssue): void {
    if (issue !== this.issueMarkedAsCurrent && issue.isCurrent) {
      this.store.dispatch(new UpdateIssue({
        ...this.issueMarkedAsCurrent,
        isCurrent: false
      }));
    }
    this.store.dispatch(new UpdateIssue(issue));
  }

  onIssueRemove(issue: IIssue): void {
    this.store.dispatch(new RemoveIssue(issue));
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

}
