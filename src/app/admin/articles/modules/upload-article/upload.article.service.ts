import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireStorage } from 'angularfire2/storage';

import { ArticleUploadFile } from 'app/models/article.upload.file';
import { F_ArticleFile } from 'app/models/firestore/article.file';
import { FileUploadTask } from 'app/models/FileUploadTask';
import { ArticleFile } from 'app/models/article.file';
import { Subject, from } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

const bucketPath = 'firebase-test/Issues/';

@Injectable()
export class UploadArticleService {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private angularFireStorage: AngularFireStorage) {}

  uploadToServer(file: ArticleFile): FileUploadTask {
    let filePath = this.generateStoragePath(file.name);
    let ref = this.angularFireStorage.ref(filePath);
    let task = ref.put(file.rawFile);

    let downloadUrl$ = new Subject<string>();

    task.snapshotChanges()
        .pipe(
          finalize(() => {

            ref.getDownloadURL()
               .pipe(
                 takeUntil(this.destroy$)
               )
               .subscribe((url: string) => {
                 downloadUrl$.next(url);
               });
          })
        )
        .subscribe();

    return new FileUploadTask(downloadUrl$.asObservable(), task.percentageChanges(), filePath);
  }

  removeFromServer(file: F_ArticleFile): Observable<void> {
    let ref = this.angularFireStorage.ref(file.storagePath);
    return ref.delete();
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private generateStoragePath(fileName: string): string {
    return bucketPath + fileName;
  }
}
