import { Component, ElementRef, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFireUploadTask } from 'angularfire2/storage';
import { ArticleFile } from 'app/models/article.file';
import { UploadArticleService } from 'app/admin/articles/modules/upload-article/upload.article.service';

const bucketPath = 'firebase-test/Issues/';

@Component({
  selector: 'rs-upload-article',
  templateUrl: './upload.article.component.html',
  styleUrls: ['./upload.article.component.scss']
})
export class UploadArticleComponent {
  uploadTask: AngularFireUploadTask;
  uploadProgress: Observable<number>;

  uploadError: string;

  articleFile: ArticleFile;

  fileDeleteInProgress: boolean = false;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(private articleUploadService: UploadArticleService) {}

  chooseFile(): boolean {
    this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click'));
    return false;
  }

  uploadFile(event): void {
    if (this.articleFile) {
      return;
    }

    this.articleFile = new ArticleFile(this.getFileFromEvent(event));
    this.uploadTask = this.articleUploadService.uploadToServer(this.articleFile, this.creteFilePath());
    this.uploadTask
      .catch((err: Error) => {
        this.uploadError = err.message;
      });
    this.uploadProgress = this.uploadTask.percentageChanges();
  }

  deleteFile(): void {
    if (!this.articleFile) {
      return;
    }

    this.fileDeleteInProgress = true;
    this.articleUploadService.removeFromServer(this.articleFile).subscribe(() => {
      this.articleFile = null;
      this.fileDeleteInProgress = false;
      this.fileInput.nativeElement.value = '';
    });
  }

  private getFileFromEvent(event): File {
    return event.target.files[0];
  }

  private creteFilePath(): string {
    return bucketPath + this.articleFile.name;
  }
}
