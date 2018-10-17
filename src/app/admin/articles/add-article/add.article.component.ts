import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Article } from 'app/models/article';

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

  showErrors: boolean = false;

  article: Article = new Article();

  constructor() {}

  save(form: NgForm): boolean {

    if (form.valid) {
      // this.uploadArticleComponent.uploadFile().subscribe(() => {
      //   console.log('DONE');
      //   console.log(this.article);
      // });
    } else {
      this.showErrors = true;
    }
    return false;
  }

  cancel(): boolean {

    return false;
  }
}
