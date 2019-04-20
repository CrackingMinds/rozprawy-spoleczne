import { Component, Input, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ArticleCardDisplayMode } from 'app/shared/templates/article-card/article.card.display.mode';
import { Article, ArticleEntity, UntypedArticle } from 'app/models/article';
import { Issue } from 'app/models/issue';

import { ModalData } from 'app/admin/pages/library/modal/modal.data';
import { ModalService } from 'app/admin/pages/library/modal/modal.service';

import { ArticleCrudComponent } from 'app/admin/pages/library/crud/article-crud/article.crud.component';

import { IssueStringPipe } from 'app/shared/pipes/issue.string.pipe';
import { ArticleCreateParams, ArticleCrudParams, ArticleEditParams } from 'app/admin/pages/library/crud/article-crud/article.crud.params';

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
  editArticle$: EventEmitter<UntypedArticle> = new EventEmitter<UntypedArticle>();

  @Output('deleteArticle')
  deleteArticle$: EventEmitter<Article> = new EventEmitter<Article>();

  articleCardDisplayModes = ArticleCardDisplayMode;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private issueStringPipe: IssueStringPipe,
              private modal: ModalService) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openArticleCreationDialog(): void {

    const modalData: ModalData<ArticleCrudParams> = {
      title: `Dodanie nowego artykułu do numeru: ${this.issueStringPipe.transform(this.issue)}`,
      content: ArticleCrudComponent,
      buttons: {
        submit: {
          text: 'Dodaj'
        }
      },
      otherParams: new ArticleCreateParams({
        issue: this.issue
      })
    };

    const dialogRef = this.modal.open(modalData);
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

    const modalData: ModalData<ArticleCrudParams> = {
      title: `Edycja artykułu: ${article.title}`,
      content: ArticleCrudComponent,
      buttons: {
        submit: {
          text: 'Zapisz'
        }
      },
      otherParams: new ArticleEditParams({
        article: article
      })
    };

    const dialogRef = this.modal.open(modalData);
    dialogRef.afterClosed()
             .pipe(
               takeUntil(this.unsubscribe$)
             )
             .subscribe((updatedArticle: UntypedArticle) => {
               if (!updatedArticle) {
                 return;
               }
               this.editArticle$.emit(updatedArticle);
             });

  }

  openArticleDeleteDialog(article: Article): void {

    const modalData: ModalData<void> = {
      title: undefined,
      content: 'Czy napewno chcesz usunąć ten artykuł?',
      buttons: {
        submit: {
          text: 'Tak'
        }
      },
      otherParams: undefined
    };

    const dialogRef = this.modal.open(modalData);
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
