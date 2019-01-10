import { Observable } from 'rxjs';

import { FileUploadTask } from 'app/models/FileUploadTask';
import { ArticleFile } from 'app/models/article.file';
import { IF_ArticleFile } from 'app/models/firestore/article.file.f';

export abstract class ArticleFileEndpoint {

  abstract upload(file: ArticleFile): FileUploadTask;
  abstract remove(file: IF_ArticleFile): Observable<void>;
  abstract checkIfFileExists(fileName: string): Observable<boolean>;

}
