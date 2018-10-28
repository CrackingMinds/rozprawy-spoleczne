import { Component, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { UploadArticleComponent } from 'app/admin/library/modules/upload-article/upload.article.component';
import { ModalContentComponent } from 'app/admin/library/list-of-issues/modals/modal/modal.content.component';
import { ArticleService } from 'app/admin/library/add-article/article.service';
import { AddArticleFormParams } from 'app/admin/library/add-article/add.article.form.params';

@Component({
  selector: 'rs-add-article',
  templateUrl: './add.article.component.html',
  styleUrls: ['./add.article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddArticleFormComponent implements ModalContentComponent, OnDestroy {

  @ViewChild(UploadArticleComponent)
  uploadArticleComponent: UploadArticleComponent;

  yearOfIssue: string = '2018';

  form = this.formBuilder.group(
    {
      articleTypeId: [undefined, Validators.required],
      title: [undefined, Validators.required],
      pages: [undefined, [Validators.required, Validators.pattern(/^\d+(-\d+)?$/)]],
      doi: [undefined, [Validators.required, Validators.pattern(
        new RegExp(`^https://doi.org/\\d*[.]?\\d*/rs.${this.yearOfIssue}[.]\\d+$`)
      )]],
      introduction: undefined,
      materialsAndMethods: undefined,
      results: undefined,
      conclusions: undefined,
      keywords: undefined,
      pdf: [undefined, Validators.required]
    }
  );

  get canSubmit(): boolean {
    return this.form.valid;
  }

  params: AddArticleFormParams;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel(): Promise<void> {
    return this.uploadArticleComponent.deleteFile();
  }

  submit(): Promise<void> {
    if (!this.form.valid) {
      return null;
    }

    this.form.value.issueId = this.params.issueId;
    return this.articleService.postArticle(this.form.value);
  }

}
