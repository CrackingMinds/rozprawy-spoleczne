import { Component, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material';

import { ArticleCardDisplayMode } from 'app/shared/templates/article-card/article.card.display.mode';
import { Article, ArticleEntity } from 'app/models/article';
import { Issue } from 'app/models/issue';

import { ModalData } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.data';
import { ModalComponent } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.component';

import { AddArticleFormComponent } from 'app/admin/pages/library/add-article/add.article.component';

import { IssueStringPipe } from 'app/shared/pipes/issue.string.pipe';
import { ArticleCrudParams } from 'app/admin/pages/library/add-article/article.crud.params';

@Component({
  selector: 'rs-list-of-articles',
  templateUrl: './list.of.articles.component.html',
  styleUrls: ['./list.of.articles.component.scss']
})
export class ListOfArticlesComponent implements OnDestroy {

  @Input()
  issue: Issue;

  @Input('articles')
  articles: Article[];

  @Output()
  createArticle: EventEmitter<ArticleEntity> = new EventEmitter<ArticleEntity>();

  @Output('editArticle')
  editArticle$: EventEmitter<ArticleEntity> = new EventEmitter<ArticleEntity>();

  @Output('deleteArticle')
  deleteArticle$: EventEmitter<Article> = new EventEmitter<Article>();

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

    const articleCrudParams: ArticleCrudParams = {
      issue: this.issue
    };

    const modalData: ModalData = {
      title: `Dodanie nowego artykułu do numeru: ${this.issueStringPipe.transform(this.issue)}`,
      content: AddArticleFormComponent,
      buttons: {
        submit: {
          text: 'Dodaj'
        }
      },
      otherParams: articleCrudParams
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: true,
      data: modalData
    });
    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
      .subscribe((newArticle: ArticleEntity) => {
        if (!newArticle) {
          return;
        }
        this.createArticle.emit(newArticle);
      });

  }

  openArticleEditDialog(article: Article): void {

    const articleCrudParams: ArticleCrudParams = {
      article: article
    };

    const modalData: ModalData = {
      title: `Edycja artykułu: ${article.title}`,
      content: AddArticleFormComponent,
      buttons: {
        submit: {
          text: 'Zapisz'
        }
      },
      otherParams: articleCrudParams
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: true,
      data: modalData
    });
    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
             .subscribe((updatedArticle: ArticleEntity) => {
               if (!updatedArticle) {
                 return;
               }
               this.editArticle$.emit(updatedArticle);
             });

  }

  openArticleDeleteDialog(article: Article): void {

    const modalData: ModalData = {
      title: undefined,
      content: 'Czy napewno chcesz usunąć ten artykuł?',
      buttons: {
        submit: {
          text: 'Tak'
        }
      },
      otherParams: undefined
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      disableClose: true,
      data: modalData
    });

    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
             .subscribe((actionSubmitted: boolean) => {
               if (!actionSubmitted) {
                 return;
               }

               this.deleteArticle$.emit(article);
             });
  }

}
