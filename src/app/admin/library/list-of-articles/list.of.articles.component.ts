import { Component, Input } from '@angular/core';

import { MatDialog } from '@angular/material';

import { Article } from 'app/models/article';
import { ModalData } from 'app/admin/library/list-of-issues/modals/modal/modal.data';
import { AddArticleFormComponent } from 'app/admin/library/add-article/add.article.component';
import { ModalComponent } from 'app/admin/library/list-of-issues/modals/modal/modal.component';
import { Issue } from 'app/models/issue';
import { AddArticleFormParams } from 'app/admin/library/add-article/add.article.form.params';

@Component({
  selector: 'rs-list-of-articles',
  templateUrl: './list.of.articles.component.html'
})
export class ListOfArticlesComponent {

  @Input()
  issue: Issue;

  @Input()
  articles: Article[];

  constructor(private dialog: MatDialog) {
  }

  ngOnChanges() {
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
    })
  }
}
