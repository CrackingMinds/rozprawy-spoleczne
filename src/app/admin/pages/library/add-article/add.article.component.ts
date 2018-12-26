import { Component, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { UploadArticleComponent } from 'app/admin/pages/library/modules/upload-article/upload.article.component';
import { ModalContentComponent, ModalReturnData } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.content.component';
import { Issue } from 'app/models/issue';
import { RawArticle } from 'app/models/article';

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

  params: Issue;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel(): void {
    // @TODO: change this
    this.uploadArticleComponent.deleteFile();
    return;
  }

  submit(): RawArticle {
    if (!this.form.valid) {
      return null;
    }

    this.form.value.issueId = this.params.id;
    return this.form.value;
  }

}
