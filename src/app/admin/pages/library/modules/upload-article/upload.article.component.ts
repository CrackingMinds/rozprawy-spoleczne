import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Observable, Subject, of } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';

import { UploadArticleService } from 'app/admin/pages/library/modules/upload-article/upload.article.service';
import { F_ArticleFile, IF_ArticleFile } from 'app/models/firestore/article.file.f';
import { ArticleFile } from 'app/models/article.file';
import { FileUploadTask } from 'app/models/FileUploadTask';
import { FirestoreArticleService } from 'app/endpoints/firestore-endpoint/article/firestore.article.service';
import { UntypedArticle } from 'app/models/article';
import { RoutesComposer } from 'app/routes-resolver/routes.composer';
import { FieldState } from 'app/admin/pages/library/modules/field.state';
import { ArticleFileError, ArticleFileErrorType, ArticleFileExistsError } from 'app/admin/pages/library/modules/upload-article/article.error';

@Component({
  selector: 'rs-upload-article',
  templateUrl: './upload.article.component.html',
  styleUrls: ['./upload.article.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadArticleComponent,
      multi: true
    },
    UploadArticleService
  ],
  host: {
    '[class.rs-has-error]': 'this.fileError'
  }
})
export class UploadArticleComponent implements ControlValueAccessor, OnDestroy {

  fileName: string = '';

  @ViewChild('fileInput')
  fileInput: ElementRef;

  file: F_ArticleFile;

  fileError: ArticleFileError;

  ArticleFileErrorType = ArticleFileErrorType;

  fieldState: FieldState = FieldState.EMPTY;

  FieldState = FieldState;

  private onChangeCallback: (file: IF_ArticleFile) => any;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private articleUploadService: UploadArticleService,
              private articleService: FirestoreArticleService) {}

  ngOnDestroy() {
    this.articleUploadService.destroy();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(): void {

    switch (this.fieldState) {

      case FieldState.EMPTY: {
        this.chooseFileFromComputer();
        break;
      }

      case FieldState.ERROR: {
        this.chooseFileFromComputer();
        break;
      }

      case FieldState.DEFAULT: {
        this.deleteFile();
        break;
      }

    }

  }

  onInputClick(): void {

    if (this.fieldState !== FieldState.EMPTY)
      return;

    this.chooseFileFromComputer();
  }

  onFileChosen(event): void {

    if (!this.checkFileChosen(event)) {
      return;
    }

    this.changeFieldState(FieldState.PENDING);

    const file = new ArticleFile(event.target.files[0]);
    this.fileName = file.name;

    this.checkIfFileExists(file.name)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((exists: ArticleFileExistsError) => {

          if (exists) {
            this.changeFieldState(FieldState.ERROR);
            this.fileError = {
              type: ArticleFileErrorType.FILE_EXISTS,
              content: exists
            };
          } else {
            this.fileError = null;
            this.uploadFile(file);
          }

        });

  }

  deleteFile(): Promise<void> {

    this.changeFieldState(FieldState.PENDING);

    return new Promise(resolve => {
      if (!this.file) {
        resolve();
      } else {
        this.articleUploadService.removeFromServer(this.file)
            .pipe(
              takeUntil(this.unsubscribe$)
            )
            .subscribe(() => {
              this.fileInput.nativeElement.value = '';
              this.file = null;
              if (this.onChangeCallback) {
                this.onChangeCallback(null);
              }

              this.changeFieldState(FieldState.EMPTY);

              resolve();
            });
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: F_ArticleFile): void {
    this.file = value;
  }

  composeArticleRouterLink(articleId: string): string[] {
    return RoutesComposer.composeArticleRouterLink(articleId);
  }

  private chooseFileFromComputer(): boolean {
    this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click'));
    return false;
  }

  private checkIfFileExists(fileName: string): Observable<ArticleFileExistsError> {
    return this.articleUploadService.checkIfFileExists(fileName)
        .pipe(
          switchMap((exists: boolean) => {
            if (exists) {
              return this.articleService.getArticleByFile(fileName)
                         .pipe(
                           map((article: UntypedArticle) => {

                             if (!article) {
                               return null;
                             }

                             const exception: ArticleFileExistsError = {
                               articleId: article.id
                             };
                             return exception;
                           })
                         );
            } else {
              return of(null);
            }
          })
        );
  }

  private uploadFile(file: ArticleFile): void {

    const uploadTask: FileUploadTask = this.articleUploadService.uploadToServer(file);
    uploadTask.downloadUrl
              .pipe(
                takeUntil(this.unsubscribe$)
              )
              .subscribe((url: string) => {
                this.changeFieldState(FieldState.DEFAULT);
                this.file = new F_ArticleFile(file.name, uploadTask.storagePath, url);
                if (this.onChangeCallback) {
                  this.onChangeCallback(this.file.value);
                }
              });
  }

  private checkFileChosen(event): boolean {
    return !!event.target.files.length;
  }

  private changeFieldState(state: FieldState): void {
    this.fieldState = state;
  }

}
