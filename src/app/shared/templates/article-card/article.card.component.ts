import { Component, Input } from '@angular/core';

import { IArticle } from 'app/models/article';
import { IIssue } from 'app/models/issue';
import { Author } from 'app/models/author';

@Component({
  selector: 'rs-article-card',
  templateUrl: './article.card.component.html'
})
export class ArticleCardComponent {
  @Input()
  article: IArticle;

  @Input()
  issue: IIssue;

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
