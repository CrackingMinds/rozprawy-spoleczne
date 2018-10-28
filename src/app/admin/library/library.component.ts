import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Article } from 'app/models/article';
import { IIssue, Issue } from 'app/models/issue';

import { IssueService } from 'app/pages/issue/issue.service';
import { PageNameService } from 'app/shared/services/page.name.service';
import { Utilits } from 'app/shared/services/utilits';
import { FIssue } from 'app/models/firestore/f.issue';
import { ArticleService } from 'app/admin/library/add-article/article.service';

@Component({
  selector: 'rs-library-editorial',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnChanges, OnInit, OnDestroy {
  issues: Issue[];
  articles: Article[];

  selectedIssue: Issue;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private issueService: IssueService,
              private articleService: ArticleService,
              private pageNameService: PageNameService) {
  }

  ngOnInit() {
    this.pageNameService.setPageName('Numery');

    this.issueService.getIssues()
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((issues: IIssue[]) => {
          this.issues = issues.map((issue: IIssue) => {
            return new Issue(issue);
          });
          this.sortIssues();
        });
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sortIssues() {
    this.issues.sort((a: Issue, b: Issue) => {
      let aIssue: FIssue = a.data;
      let bIssue: FIssue = b.data;
      if (aIssue.year === bIssue.year) {

        if (aIssue.vol === bIssue.vol) {

          if (aIssue.number === bIssue.number) {
            return 0;
          }
          else {
            return Utilits.sortByValue(aIssue.number, bIssue.number);
          }
        }
        else {
          return Utilits.sortByValue(aIssue.vol, bIssue.vol);
        }
      }
      else {
        return Utilits.sortByValue(aIssue.year, bIssue.year);
      }
    });
  }

  onIssueSelect(issue: Issue): void {
    this.selectedIssue = issue;

    this.articleService.getArticlesInIssue(issue.id)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((articles: Article[]) => {
          this.articles = articles;
        });
  }

}
