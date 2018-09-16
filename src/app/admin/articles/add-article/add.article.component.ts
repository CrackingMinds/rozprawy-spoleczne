import { Component, ViewEncapsulation } from '@angular/core';

import { Article } from 'app/models/article';

@Component({
  selector: 'rs-add-article',
  templateUrl: './add.article.component.html',
  styleUrls: ['./add.article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddArticleComponent {

  article: Article = new Article();

  constructor() {}

  save(): boolean {
    console.log(this.article);
    return false;
  }

  cancel(): void {

  }
}
