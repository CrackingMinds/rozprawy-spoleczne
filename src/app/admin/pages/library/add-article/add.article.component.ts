import { Component, ViewEncapsulation, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Subject, Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UploadArticleComponent } from 'app/admin/pages/library/modules/upload-article/upload.article.component';
import { ModalContentComponent } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.content.component';
import { Issue } from 'app/models/issue';
import { ArticleEntity } from 'app/models/article';
import { ArticleType } from 'app/models/article.type';
import { ArticleTypeEndpoint } from 'app/endpoints/endpoint/article-type/article.type.endpoint';

@Component({
  selector: 'rs-add-article',
  templateUrl: './add.article.component.html',
  styleUrls: ['./add.article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddArticleFormComponent implements ModalContentComponent, OnInit, OnDestroy {

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

  params: Issue;

  articleTypes: ArticleType[];

  private canSubmit$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private articleTypeEndpoint: ArticleTypeEndpoint) {}

  ngOnInit() {
    this.initFormValidityListener();

    this.fetchArticleTypes();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cancel(): void {
    // @TODO: change this
    this.uploadArticleComponent.deleteFile();
    return;
  }

  submit(): ArticleEntity {
    if (!this.form.valid) {
      return null;
    }

    this.form.value.issueId = this.params.id;
    return this.form.value;
  }

  canSubmit(): Observable<boolean> {
    return this.canSubmit$.asObservable();
  }

  private initFormValidityListener(): void {
    this.canSubmit$.next(this.form.valid);

    this.form.statusChanges
        .subscribe((value: string) => {

          switch (value) {

            case 'INVALID': {
              this.canSubmit$.next(false);
              break;
            }

            case 'VALID': {
              this.canSubmit$.next(true);
              break;
            }
          }

        });
  }

  private fetchArticleTypes(): void {
    this.articleTypeEndpoint.getArticleTypes()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((articleTypes: ArticleType[]) => this.articleTypes = articleTypes);
  }

}
