import { Component, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { MatDialog } from '@angular/material';

import { IArticle, RawArticleWithTypeId } from 'app/models/article';
import { IIssue } from 'app/models/issue';

import { ModalData } from 'app/admin/library/list-of-issues/modals/modal/modal.data';
import { ModalComponent } from 'app/admin/library/list-of-issues/modals/modal/modal.component';

import { AddArticleFormComponent } from 'app/admin/library/add-article/add.article.component';

import { IssueStringPipe } from 'app/shared/pipes/issue.string.pipe';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'rs-list-of-articles',
  templateUrl: './list.of.articles.component.html',
  styleUrls: ['./list.of.articles.component.scss']
})
export class ListOfArticlesComponent implements OnDestroy {

  @Input()
  issue: IIssue;

  @Input('articles')
  articles$: Observable<IArticle[]>;

  @Output()
  createArticle: EventEmitter<RawArticleWithTypeId> = new EventEmitter<RawArticleWithTypeId>();

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
      .subscribe((newArticle: RawArticleWithTypeId) => {
        if (!newArticle) {
          return;
        }
        this.createArticle.emit(newArticle);
      });

  }
}
