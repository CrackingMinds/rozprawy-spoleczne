import { Component, Input } from '@angular/core';

import { Article } from 'app/models/article';
import { Issue } from 'app/models/issue';
import { ArticleCardDisplayMode } from 'app/shared/templates/article-card/article.card.display.mode';

import { RoutesResolver } from 'app/routes-resolver/routes.resolver';

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
}
