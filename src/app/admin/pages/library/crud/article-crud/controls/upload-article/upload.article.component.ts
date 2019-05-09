import { Component, ElementRef, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IF_ArticleFile } from 'app/models/firestore/article.file.f';
import { ArticleFile } from 'app/models/article.file';
import { RoutesComposer } from 'app/shared/routing-helpers/routes.composer';
import { FieldState } from 'app/admin/pages/library/crud/article-crud/controls/field.state';
import { ArticleFileError, ArticleFileErrorType, ArticleFileExistsError } from 'app/admin/pages/library/crud/article-crud/controls/upload-article/article.error';
import { ArticleFileRepository } from 'app/admin/pages/library/crud/article-crud/article.file.repository';

@Component({
  selector: 'rs-upload-article',
  templateUrl: './upload.article.component.html',
  styleUrls: ['./upload.article.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UploadArticleComponent,
      multi: true
    }
  ],
  host: {
    '[class.rs-has-error]': 'this.fileError'
  }
})
export class UploadArticleComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @ViewChild('fileInput')
  fileInput: ElementRef;

  fileName: string = '';
  file: IF_ArticleFile;

  fileError: ArticleFileError;
  ArticleFileErrorType = ArticleFileErrorType;

  fieldState: FieldState = FieldState.EMPTY;
  FieldState = FieldState;

  private onChangeCallback: (file: IF_ArticleFile) => any;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private articleFileRepository: ArticleFileRepository) {}

  ngOnInit() {
    this.articleFileRepository.selectArticleFile()
        .pipe(
          takeUntil(this.unsubscribe$)
        )
      .subscribe((file: IF_ArticleFile) => {

        this.file = file;
        this.reportFileChanges(file);

        if (file) {
          this.fileName = file.name;
          this.changeFieldState(FieldState.DEFAULT);
        } else {
          this.fileInput.nativeElement.value = '';
          this.changeFieldState(FieldState.EMPTY);
        }

      });
  }

  ngOnDestroy() {
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

  onFileChosen(event: Event): void {

    const eventTarget: HTMLInputElement = event.target as HTMLInputElement;

    if (!eventTarget.files.length) {
      return;
    }

    this.changeFieldState(FieldState.PENDING);

    const file = new ArticleFile(eventTarget.files[0]);
    this.fileName = file.name;

    this.articleFileRepository.checkIfFileExists(file.name)
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

  deleteFile(): void {

    this.changeFieldState(FieldState.PENDING);

    this.articleFileRepository.remove()
        .pipe(
          takeUntil(this.unsubscribe$)
        )
      .subscribe(() => {
        this.fileInput.nativeElement.value = '';
        this.changeFieldState(FieldState.EMPTY);
      });

  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  writeValue(value: any): void {}

  composeArticleRouterLink(articleId: string): string[] {
    return RoutesComposer.composeArticleRouterLink(articleId);
  }

  private reportFileChanges(value: IF_ArticleFile): void {
    if (this.onChangeCallback) {
      this.onChangeCallback(value);
    }
  }

  private chooseFileFromComputer(): boolean {
    this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click'));
    return false;
  }

  private uploadFile(file: ArticleFile): void {
    this.articleFileRepository.upload(file);
  }

  private changeFieldState(state: FieldState): void {
    this.fieldState = state;
  }

}
