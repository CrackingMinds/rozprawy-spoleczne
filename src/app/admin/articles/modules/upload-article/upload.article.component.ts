import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';

import { Subject } from 'rxjs';

import { UploadArticleService } from 'app/admin/articles/modules/upload-article/upload.article.service';
import { F_ArticleFile } from 'app/models/firestore/article.file';

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
    {
      provide: NG_VALIDATORS,
      useExisting: UploadArticleComponent,
      multi: true
    },
    UploadArticleService
  ]
})
export class UploadArticleComponent implements ControlValueAccessor, Validator, OnDestroy {
  uploadError: string;

  file: F_ArticleFile;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  private onChangeCallback: (file: F_ArticleFile) => any;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private articleUploadService: UploadArticleService) {}

  ngOnDestroy() {
    this.articleUploadService.destroy();

    this.destroy$.next();
    this.destroy$.complete();
  }

  chooseFileFromComputer(): boolean {
    this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click'));
    return false;
  }

  onFileChosen(event): void {
    let rawFile = event.target.files[0];
    this.file = new F_ArticleFile(
      rawFile.name,
      this.articleUploadService.generateStoragePath(rawFile.name)
    );
    if (this.onChangeCallback) {
      this.onChangeCallback(this.file);
    }
  }

  deleteFile(): void {
    if (this.onChangeCallback) {
      this.onChangeCallback(null);
    }
    this.file = null;
    this.fileInput.nativeElement.value = '';
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

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value) {
      return null;
    } else {
      return {
        fileNotChosen: true
      };
    }
  }

}
