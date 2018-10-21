import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subject, Observable } from 'rxjs';

import { UploadArticleService } from 'app/admin/articles/modules/upload-article/upload.article.service';
import { F_ArticleFile } from 'app/models/firestore/article.file';
import { ArticleFile } from 'app/models/article.file';
import { FileUploadTask } from 'app/models/FileUploadTask';
import { takeUntil } from 'rxjs/operators';

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
  ]
})
export class UploadArticleComponent implements ControlValueAccessor, OnDestroy {

  fileChosen: boolean = false;
  uploadProgress: Observable<number>;
  fileName: string = '';

  deleting: boolean = false;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  file: F_ArticleFile;

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
    let file = new ArticleFile(event.target.files[0]);
    this.fileName = file.name;

    let uploadTask = this.articleUploadService.uploadToServer(file);

    this.uploadProgress = uploadTask.uploadProgress;

    this.fileChosen = true;

    uploadTask.downloadUrl
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((url: string) => {
        this.file = new F_ArticleFile(file.name, uploadTask.storagePath, url);
        if (this.onChangeCallback) {
          this.onChangeCallback(this.file);
        }
      });
  }

  deleteFile(): void {
    this.deleting = true;
    this.articleUploadService.removeFromServer(this.file)
        .pipe()
        .subscribe(() => {
          this.deleting = false;
          this.fileChosen = false;
          this.fileInput.nativeElement.value = '';
          this.file = null;
          if (this.onChangeCallback) {
            this.onChangeCallback(null);
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

}
