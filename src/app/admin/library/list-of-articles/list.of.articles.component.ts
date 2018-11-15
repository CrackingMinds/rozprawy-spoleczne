import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { MatDialog } from '@angular/material';

import { IArticle } from 'app/models/article';
import { IIssue } from 'app/models/issue';

import { ModalData } from 'app/admin/library/list-of-issues/modals/modal/modal.data';
import { ModalComponent } from 'app/admin/library/list-of-issues/modals/modal/modal.component';

import { AddArticleFormComponent } from 'app/admin/library/add-article/add.article.component';
import { AddArticleFormParams } from 'app/admin/library/add-article/add.article.form.params';

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

    let params = new AddArticleFormParams();
    params.issueId = this.issue.id;

    let modalData: ModalData = {
      title: `Dodanie nowego artykułu do numeru: ${this.issue.toString()}`,
      content: AddArticleFormComponent,
      buttons: {
        submit: {
          text: 'Dodaj'
        }
      },
      otherParams: params
    };

    this.dialog.open(ModalComponent, {
      disableClose: true,
      data: modalData
    });
  }
}
