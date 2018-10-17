import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { Article } from 'app/models/article';

import { UploadArticleService } from 'app/admin/articles/modules/upload-article/upload.article.service';
import { UploadArticleComponent } from 'app/admin/articles/modules/upload-article/upload.article.component';

@Component({
  selector: 'rs-add-article',
  templateUrl: './add.article.component.html',
  styleUrls: ['./add.article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddArticleComponent {

  @ViewChild(UploadArticleComponent)
  uploadArticleComponent: UploadArticleComponent;

  article: Article = new Article();

  constructor() {}

  save(): boolean {

    this.uploadArticleComponent.uploadFile().subscribe(() => {
      console.log('DONE');
      console.log(this.article);
    });

    return false;
  }

  cancel(): boolean {

    return false;
  }
}
