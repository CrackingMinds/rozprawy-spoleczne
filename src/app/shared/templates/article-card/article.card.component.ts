import { Component, Input } from '@angular/core';

import { Article } from 'app/models/article';
import { Issue } from 'app/models/issue';
import { Author } from 'app/models/author';
import { ArticleCardDisplayMode } from 'app/shared/templates/article-card/article.card.display.mode';

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

  authorToString(author: Author): string {

    // @TODO: replace with pipe
    if (!author.middleName) {
      return `${author.firstName} ${author.lastName}`;
    } else {
      return 'format unknown';
    }
  }
}
