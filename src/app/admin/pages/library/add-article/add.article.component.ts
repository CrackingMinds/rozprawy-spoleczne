import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UploadArticleComponent } from 'app/admin/pages/library/modules/upload-article/upload.article.component';
import { ModalContentComponent } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.content.component';
import { Article, ArticleEntity } from 'app/models/article';
import { ArticleType } from 'app/models/article.type';
import { ArticleTypeEndpoint } from 'app/endpoints/endpoint/article-type/article.type.endpoint';
import { ArticleCrudParams } from 'app/admin/pages/library/add-article/article.crud.params';

@Component({
  selector: 'rs-add-article',
  templateUrl: './add.article.component.html',
  styleUrls: ['./add.article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddArticleFormComponent implements ModalContentComponent, OnInit, OnDestroy {

  @ViewChild(UploadArticleComponent)
  uploadArticleComponent: UploadArticleComponent;

  yearOfIssue: string;

  form: FormGroup;

  params: ArticleCrudParams;

  articleTypes: ArticleType[];

  initialArticleData: ArticleEntity;

  private canSubmit$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private articleTypeEndpoint: ArticleTypeEndpoint) {}

  ngOnInit() {



    if (this.params.issue) {
      this.yearOfIssue = this.params.issue.year;
    }

    this.initialArticleData = {
      articleTypeId: undefined,
      title: undefined,
      pages: undefined,
      doi: undefined,
      introduction: undefined,
      materialsAndMethods: undefined,
      results: undefined,
      conclusions: undefined,
      keywords: undefined,
      pdf: undefined,
      authors: undefined,
      issueId: undefined
    };

    if (this.params.article) {
      const paramsArticle: Article = this.params.article;
      this.initialArticleData = {
        articleTypeId: paramsArticle.articleType.id,
        title: paramsArticle.title,
        pages: paramsArticle.pages,
        doi: paramsArticle.doi,
        introduction: paramsArticle.introduction,
        materialsAndMethods: paramsArticle.materialsAndMethods,
        results: paramsArticle.results,
        conclusions: paramsArticle.conclusions,
        keywords: paramsArticle.keywords,
        pdf: paramsArticle.pdf,
        authors: paramsArticle.authors,
        issueId: paramsArticle.issueId
      }
    }

    this.initArticleForm();

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

    if (this.params.issue) {
      this.form.value.issueId = this.params.issue.id;
    }
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

  private initArticleForm(): void {
    this.form = this.formBuilder.group(
      {
        articleTypeId: [
          this.initialArticleData.articleTypeId,
          Validators.required
        ],
        authors: [
          this.initialArticleData.authors,
          Validators.required
        ],
        title: [
          this.initialArticleData.title,
          Validators.required
        ],
        pages: [
          this.initialArticleData.pages,
          [Validators.required, Validators.pattern(/^\d+(-\d+)?$/)]
        ],
        doi: [
          this.initialArticleData.doi,
          [Validators.required, Validators.pattern(
            new RegExp(`^https://doi.org/\\d*[.]?\\d*/rs.${this.yearOfIssue}[.]\\d+$`)
          )]
        ],
        introduction: this.initialArticleData.introduction,
        materialsAndMethods: this.initialArticleData.materialsAndMethods,
        results: this.initialArticleData.results,
        conclusions: this.initialArticleData.conclusions,
        keywords: this.initialArticleData.keywords,
        pdf: [
          this.initialArticleData.pdf,
          Validators.required
        ]
      }
    );
  }

}
