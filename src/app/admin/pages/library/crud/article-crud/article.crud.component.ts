import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UploadArticleComponent } from 'app/admin/pages/library/crud/article-crud/controls/upload-article/upload.article.component';
import { Article, ArticleEntity } from 'app/models/article';
import { ArticleType } from 'app/models/article.type';
import { ArticleTypeEndpoint } from 'app/endpoints/endpoint/article-type/article.type.endpoint';
import { ArticleCreatePayload, ArticleCrudParams, ArticleCrudType, ArticleEditPayload } from 'app/admin/pages/library/crud/article-crud/article.crud.params';
import { CustomValidators } from 'app/shared/custom.validators';
import { ArticleFileRepository } from 'app/admin/pages/library/crud/article-crud/article.file.repository';

import { ModalContentComponent } from 'app/admin/pages/library/modal/content/modal.content.component';

@Component({
  selector: 'rs-add-article',
  templateUrl: './article.crud.component.html',
  styleUrls: ['./article.crud.component.scss'],
  providers: [
    ArticleFileRepository
  ],
  encapsulation: ViewEncapsulation.None
})
export class ArticleCrudComponent extends ModalContentComponent<ArticleCrudParams, ArticleEntity> implements OnInit, OnDestroy {

  @ViewChild(UploadArticleComponent)
  uploadArticleComponent: UploadArticleComponent;

  form: FormGroup;

  articleTypes: ArticleType[];

  initialArticleData: ArticleEntity;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private articleFileRepository: ArticleFileRepository,
              private articleTypeEndpoint: ArticleTypeEndpoint) { super(); }

  ngOnInit() {

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

    if (this.params.type === ArticleCrudType.EDIT) {
      const initialArticle: Article = (this.params.payload as ArticleEditPayload).article;
      this.initialArticleData = {
        articleTypeId: initialArticle.articleType.id,
        title: initialArticle.title,
        pages: initialArticle.pages,
        doi: initialArticle.doi,
        introduction: initialArticle.introduction,
        materialsAndMethods: initialArticle.materialsAndMethods,
        results: initialArticle.results,
        conclusions: initialArticle.conclusions,
        keywords: initialArticle.keywords,
        pdf: initialArticle.pdf,
        authors: initialArticle.authors,
        issueId: initialArticle.issueId
      }
    }

    this.initArticleForm();

    this.initFormValidityListener();

    this.fetchArticleTypes();

    this.articleFileRepository.init(this.initialArticleData.pdf, this.params.type);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  cancel(): void {
    this.articleFileRepository.cancelChanges();
  }

  submit(): ArticleEntity {
    if (!this.form.valid) {
      return null;
    }

    if (this.params.type === ArticleCrudType.CREATE) {
      this.form.value.issueId = (this.params.payload as ArticleCreatePayload).issue.id;
    }

    if (this.params.type === ArticleCrudType.EDIT) {
      this.form.value.id = (this.params.payload as ArticleEditPayload).article.id;
      this.form.value.issueId = (this.params.payload as ArticleEditPayload).article.issueId;
    }

    this.articleFileRepository.submitChanges();

    return this.form.value;
  }

  private initFormValidityListener(): void {

    if (this.form.valid) {
      this.enableSubmit();
    } else {
      this.disableSubmit();
    }

    this.form.statusChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((formStatus: string) => {

          switch (formStatus) {

            case 'INVALID': {
              this.disableSubmit();
              break;
            }

            case 'VALID': {
              this.enableSubmit();
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
          [
            Validators.required,
            Validators.pattern(
              CustomValidators.fullMatch(CustomValidators.pagesInIssue)
            )
          ]
        ],
        doi: [
          this.initialArticleData.doi,
          [
            Validators.required,
            Validators.pattern(
              CustomValidators.fullMatch(CustomValidators.doi)
            )
          ]
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
