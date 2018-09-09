import { Component, ElementRef, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFireUploadTask } from 'angularfire2/storage';
import { ArticleFile } from 'app/models/article.file';
import { ArticleUploadService } from 'app/article-upload/article.upload.service';

const bucketPath = 'firebase-test/Issues/';

@Component({
  selector: 'rs-file-upload',
  templateUrl: './article.upload.component.html',
  styleUrls: ['./article.upload.component.scss']
})
export class ArticleUploadComponent {
  uploadTask: AngularFireUploadTask;
  uploadProgress: Observable<number>;

  uploadError: string;

  articleFile: ArticleFile;

  fileDeleteInProgress: boolean = false;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(private articleUploadService: ArticleUploadService) {}

  chooseFile(): void {
    this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click'));
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
    });
  }

  private getFileFromEvent(event): File {
    return event.target.files[0];
  }

  private creteFilePath(): string {
    return bucketPath + this.articleFile.name;
  }
}
