import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Article } from 'app/models/article';
import { Issue } from 'app/models/issue';
import { ArticleCardDisplayMode } from 'app/shared/templates/article-card/article.card.display.mode';

import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';

@Component({
  selector: 'rs-article-card',
  templateUrl: './article.card.component.html',
  styleUrls: ['./article.card.component.scss']
})
export class ArticleCardComponent {

  @Input()
  article: Article;

  @Input()
  issue: Issue;

  @Input()
  withoutAbstractBtn: boolean = false;

  @Input()
  mode: ArticleCardDisplayMode = ArticleCardDisplayMode.VIEW;

  @Output('editArticle')
  editArticle$: EventEmitter<Article> = new EventEmitter<Article>();

  @Output('deleteArticle')
  deleteArticle$: EventEmitter<Article> = new EventEmitter<Article>();

  AvailableModes = ArticleCardDisplayMode;

  constructor() {
  }

  getLocationInIssue(): string {
    return `Rozprawy Społeczne, ${this.issue.vol}(${this.issue.number}), ${this.article.pages}`;
  }

  composeArticleRouterLink(articleId: string): string[] {
    return [
      `/${RoutesResolver.article}`,
      articleId
    ];
  }

  editArticle(): void {
    this.editArticle$.emit(this.article);
  }

  deleteArticle(): void {
    this.deleteArticle$.emit(this.article);
  }

}
