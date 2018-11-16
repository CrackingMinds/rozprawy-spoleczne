import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material';

import { IArticle } from 'app/models/article';
import { IIssue } from 'app/models/issue';

import { ModalData } from 'app/admin/library/list-of-issues/modals/modal/modal.data';
import { ModalComponent } from 'app/admin/library/list-of-issues/modals/modal/modal.component';

import { AddArticleFormComponent } from 'app/admin/library/add-article/add.article.component';

@Component({
  selector: 'rs-list-of-articles',
  templateUrl: './list.of.articles.component.html'
})
export class ListOfArticlesComponent {

  @Input()
  issue: IIssue;

  @Input('articles')
  articles$: Observable<IArticle[]>;

  constructor(private dialog: MatDialog) {
  }

  openArticleCreationDialog(): void {

    let modalData: ModalData = {
      title: `Dodanie nowego artykułu do numeru: ${this.issue.toString()}`, // @TODO: issue.toString() doesn't exist any more
      content: AddArticleFormComponent,
      buttons: {
        submit: {
          text: 'Dodaj'
        }
      },
      otherParams: this.issue
    };

    this.dialog.open(ModalComponent, {
      disableClose: true,
      data: modalData
    });
  }
}
