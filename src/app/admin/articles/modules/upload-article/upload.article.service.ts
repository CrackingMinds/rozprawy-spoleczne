import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AngularFireStorage } from 'angularfire2/storage';

import { ArticleUploadFile } from 'app/models/article.upload.file';
import { F_ArticleFile } from 'app/models/firestore/article.file';

const bucketPath = 'firebase-test/Issues/';

@Injectable()
export class UploadArticleService {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private angularFireStorage: AngularFireStorage) {}

  uploadToServer(file: ArticleUploadFile): Observable<F_ArticleFile> {
    let filePath = bucketPath + file.name;
    file.ref = this.angularFireStorage.ref(filePath);

    let task = file.ref.put(file.rawFile);

    let articleFile$ = new Subject<F_ArticleFile>();

    task.then(() => {

      file.ref.getDownloadURL()
          .pipe(
            takeUntil(this.destroy$)
          )
          .subscribe((url: string) => {

        articleFile$.next(
          new F_ArticleFile()
            .withDownloadUrl(url)
            .withStoragePath(filePath)
        );
        articleFile$.complete();
      });
    });

    return articleFile$.asObservable();
  }

  // removeFileFromServer(): Observable<any> {
  //   if (this.haveFileToDelete()) {
  //     let deleteTask = this.lastUploadedFile.ref.delete();
  //     this.lastUploadedFile = null;
  //     return deleteTask;
  //   }
  // }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
