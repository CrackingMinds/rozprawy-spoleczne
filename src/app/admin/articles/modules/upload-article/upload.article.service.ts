import { Injectable } from '@angular/core';
import { ArticleFile } from 'app/models/article.file';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadArticleService {

  constructor(private angularFireStorage: AngularFireStorage) {}

  uploadToServer(file: ArticleFile, path: string): AngularFireUploadTask {
    file.ref = this.angularFireStorage.ref(path);

    let task = file.ref.put(file.rawFile);
    task.then(() => {
      file.isUploaded = true;
      file.url = file.ref.getDownloadURL();
    });
    return task;
  }

  removeFromServer(file: ArticleFile): Observable<any> {
    return file.ref.delete();
  }
}
