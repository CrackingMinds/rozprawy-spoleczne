import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { ArticleUploadFile } from 'app/models/article.upload.file';
import { UploadArticleService } from 'app/admin/articles/modules/upload-article/upload.article.service';
import { ArticleFile } from 'app/models/article.file';
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
    UploadArticleService
  ]
})
export class UploadArticleComponent implements ControlValueAccessor, OnInit, OnDestroy {
  uploadError: string;

  fileToUpload: ArticleUploadFile;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  private onChangeCallback: (file: F_ArticleFile) => any;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private articleUploadService: UploadArticleService) {}

  ngOnInit() {

  }

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
    let rawFile = this.getFileFromEvent(event);
    this.fileToUpload = new ArticleUploadFile(rawFile);
  }

  uploadFile(): Observable<F_ArticleFile> {
    let uploadTask: Observable<F_ArticleFile> = this.articleUploadService.uploadToServer(this.fileToUpload);

    uploadTask.subscribe((file: F_ArticleFile) => {
      if (this.onChangeCallback) {
        this.onChangeCallback(file);
      }
    });

    return uploadTask;
  }

  deleteFile(): void {
    this.fileToUpload = null;
    this.fileInput.nativeElement.value = '';
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: ArticleFile): void {
    // this.articleUploadFile = value;
  }

  private getFileFromEvent(event): File {
    return event.target.files[0];
  }
}
