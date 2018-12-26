import { Component, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material';

import { ArticleCardDisplayMode } from 'app/shared/templates/article-card/article.card.display.mode';
import { Article, RawArticle } from 'app/models/article';
import { Issue } from 'app/models/issue';

import { ModalData } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.data';
import { ModalComponent } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.component';

import { AddArticleFormComponent } from 'app/admin/pages/library/add-article/add.article.component';

import { IssueStringPipe } from 'app/shared/pipes/issue.string.pipe';

@Component({
  selector: 'rs-list-of-articles',
  templateUrl: './list.of.articles.component.html',
  styleUrls: ['./list.of.articles.component.scss']
})
export class ListOfArticlesComponent implements OnDestroy {

  @Input()
  issue: Issue;

  @Input('articles')
  articles$: Observable<Article[]>;

  @Output()
  createArticle: EventEmitter<RawArticle> = new EventEmitter<RawArticle>();

  articleCardDisplayModes = ArticleCardDisplayMode;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private issueStringPipe: IssueStringPipe,
              private dialog: MatDialog) {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openArticleCreationDialog(): void {

    let modalData: ModalData = {
      title: `Dodanie nowego artykułu do numeru: ${this.issueStringPipe.transform(this.issue)}`,
      content: AddArticleFormComponent,
      buttons: {
        submit: {
          text: 'Dodaj'
        }
      },
      otherParams: this.issue
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: true,
      data: modalData
    });
    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
      .subscribe((newArticle: RawArticle) => {
        if (!newArticle) {
          return;
        }
        this.createArticle.emit(newArticle);
      });

  }
}
