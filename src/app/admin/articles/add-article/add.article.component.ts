import { Component, ViewEncapsulation, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Article } from 'app/models/article';

import { UploadArticleComponent } from 'app/admin/articles/modules/upload-article/upload.article.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'rs-add-article',
  templateUrl: './add.article.component.html',
  styleUrls: ['./add.article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddArticleFormComponent implements OnDestroy {

  @ViewChild(UploadArticleComponent)
  uploadArticleComponent: UploadArticleComponent;

  yearOfIssue: string = '2018';

  form = this.formBuilder.group(
    {
      name: [undefined, Validators.required],
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

  showErrors: boolean = false;

  article: Article = new Article();

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  save(): boolean {

    // if (form.valid) {
    //   // this.uploadArticleComponent.uploadFile().subscribe(() => {
    //   //   console.log('DONE');
    //   //   console.log(this.article);
    //   // });
    // } else {
    //   this.showErrors = true;
    // }

    // this.close();

    return false;
  }

  cancel(): boolean {

    this.uploadArticleComponent.deleteFile()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.close();
      });

    return false;
  }

  private close(): void {
    debugger
  }
}
