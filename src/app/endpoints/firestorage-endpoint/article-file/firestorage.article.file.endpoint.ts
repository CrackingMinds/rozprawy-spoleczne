import { Injectable } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';

import { AngularFireStorage } from 'angularfire2/storage';

import { ArticleFileEndpoint } from 'app/endpoints/endpoint/article-file/article.file.endpoint';
import { F_ArticleFile } from 'app/models/firestore/article.file.f';
import { ArticleFile } from 'app/models/article.file';
import { FileUploadTask } from 'app/models/FileUploadTask';

const bucketPath: string = 'firebase-test/Issues/';

@Injectable()
export class FirestorageArticleFileEndpoint extends ArticleFileEndpoint {

  constructor(private angularFireStorage: AngularFireStorage) { super(); }

  checkIfFileExists(fileName: string): Observable<boolean> {
    const filePath: string = this.composeStoragePath(fileName);
    return this.angularFireStorage.ref(filePath).getMetadata()
               .pipe(
                 map((metadata) => !!metadata),
                 catchError(() => of(false))
               );
  }

  remove(file: F_ArticleFile): Observable<void> {
    const ref = this.angularFireStorage.ref(file.storagePath);
    return ref.delete();
  }

  upload(file: ArticleFile): FileUploadTask {
    const filePath = this.composeStoragePath(file.name);
    const ref = this.angularFireStorage.ref(filePath);
    const task = ref.put(file.rawFile);
    const downloadUrl$ = new Subject<string>();

    task.snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL()
               .subscribe((url: string) => {
                 downloadUrl$.next(url);
               });
          })
        ).subscribe();

    return new FileUploadTask(downloadUrl$.asObservable(), task.percentageChanges(), filePath);
  }

  private composeStoragePath(fileName: string): string {
    return bucketPath + fileName;
  }

}
