import { Component, Input, OnInit } from '@angular/core';

import { Article } from 'app/models/article';
import { Issue } from 'app/models/issue';
import { Author } from 'app/models/author';


@Component({
  selector: 'rs-article-card',
  templateUrl: './article.card.component.html'
})
export class ArticleCardComponent implements OnInit {
  @Input()
  article: Article;

  @Input()
  issue: Issue;

  constructor() {
  }

  ngOnInit() {

  }

  getLocationInIssue(): string {
    // Rozprawy Społeczne, 12(2), 7-15
    return `Rozprawy Społeczne, ${this.issue.data.vol}(${this.issue.data.number}), ${this.article.pages}`;
  }

  authorToString(author: Author): string {

    if (!author.middleName) {
      return `${author.firstName} ${author.lastName}`;
    } else {
      return 'format unknown';
    }
  }
}
