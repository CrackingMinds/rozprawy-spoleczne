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

type FileExists = {
  articleId: string;
};

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

  fileExists: FileExists;

  fileError: string;

  showSpinner: boolean = false;

  private onChangeCallback: (file: IF_ArticleFile) => any;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private articleUploadService: UploadArticleService,
              private articleService: FirestoreArticleService) {}

  ngOnDestroy() {
    this.articleUploadService.destroy();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  chooseFileFromComputer(): boolean {
    this.fileExists = null;
    this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click'));
    return false;
  }

  onFileChosen(event): void {

    if (!this.checkFileChosen(event)) {
      return;
    }

    this.showSpinner = true;

    const file = new ArticleFile(event.target.files[0]);
    this.fileName = file.name;

    this.checkIfFileExists(file.name)
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((exists: FileExists) => {

          if (exists) {
            this.fileExists = exists;
          } else {
            this.uploadFile(file);
          }

          this.showSpinner = false;

        });

  }

  deleteFile(): Promise<void> {

    return new Promise(resolve => {
      if (!this.file) {
        resolve();
      } else {
        this.deleting = true;
        this.articleUploadService.removeFromServer(this.file)
            .pipe(
              takeUntil(this.unsubscribe$)
            )
            .subscribe(() => {
              this.deleting = false;
              this.fileChosen = false;
              this.fileInput.nativeElement.value = '';
              this.file = null;
              if (this.onChangeCallback) {
                this.onChangeCallback(null);
              }

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

  private checkIfFileExists(fileName: string): Observable<FileExists> {
    return this.articleUploadService.checkIfFileExists(fileName)
        .pipe(
          switchMap((exists: boolean) => {
            if (exists) {
              return this.articleService.getArticleByFile(fileName)
                         .pipe(
                           map((article: UntypedArticle) => {

                             if (!article) {
                               throw Error('Plik już istnieje. Natomiast nie jest on częścią żadnego z artykułów');
                             }

                             const exists: FileExists = {
                               articleId: article.id
                             };
                             return exists;
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

    this.uploadProgress = uploadTask.uploadProgress;

    this.fileChosen = true;

    uploadTask.downloadUrl
              .pipe(
                takeUntil(this.unsubscribe$)
              )
              .subscribe((url: string) => {
                this.file = new F_ArticleFile(file.name, uploadTask.storagePath, url);
                if (this.onChangeCallback) {
                  this.onChangeCallback(this.file.value);
                }
              });
  }

  private checkFileChosen(event): boolean {
    return !!event.target.files.length;
  }

}
