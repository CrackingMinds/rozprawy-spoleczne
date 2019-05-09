import { Injectable } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AngularFireStorage } from 'angularfire2/storage';

import { FirestorageArticleFileEndpointErrorHandler } from 'app/endpoints/firestorage-endpoint/article-file/firestorage.article.file.endpoint.error.handler';

import { ArticleFileEndpoint } from 'app/endpoints/endpoint/article-file/article.file.endpoint';

import { IF_ArticleFile } from 'app/models/firestore/article.file.f';
import { ArticleFile } from 'app/models/article.file';
import { FileUploadTask } from 'app/models/FileUploadTask';

const bucketPath: string = 'article-files/';

@Injectable()
export class FirestorageArticleFileEndpoint extends ArticleFileEndpoint {

  constructor(private readonly angularFireStorage: AngularFireStorage,
              private readonly firestorageErrorHandler: FirestorageArticleFileEndpointErrorHandler) { super(); }

  checkIfFileExists(fileName: string): Observable<boolean> {
    const filePath: string = this.composeStoragePath(fileName);
    return this.angularFireStorage.ref(filePath).getMetadata()
               .pipe(
                 map((metadata) => !!metadata),
                 catchError(() => of(false))
               );
  }

  remove(file: IF_ArticleFile): Observable<void> {
    const ref = this.angularFireStorage.ref(file.storagePath);
    return ref.delete();
  }

  upload(file: ArticleFile): FileUploadTask {
    const filePath = this.composeStoragePath(file.name);
    const ref = this.angularFireStorage.ref(filePath);
    const downloadUrl$ = new Subject<string>();

    const task = ref.put(file.rawFile);
    task.then(
      () => {
        ref.getDownloadURL()
           .subscribe((url: string) => {
             downloadUrl$.next(url);
           });
      },
      (reason: any) => {
        this.firestorageErrorHandler.handle(reason);
        downloadUrl$.next(null);
      }
    );

    return new FileUploadTask(downloadUrl$.asObservable(), task.percentageChanges(), filePath);
  }

  private composeStoragePath(fileName: string): string {
    return bucketPath + fileName;
  }

}
