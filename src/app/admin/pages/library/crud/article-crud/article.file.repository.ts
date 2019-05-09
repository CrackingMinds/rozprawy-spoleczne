import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ArticleFileEndpoint } from 'app/endpoints/endpoint/article-file/article.file.endpoint';
import { IF_ArticleFile } from 'app/models/firestore/article.file.f';
import { ArticleFile } from 'app/models/article.file';
import { ArticleCrudType } from 'app/admin/pages/library/crud/article-crud/article.crud.params';
import { FirestoreArticleService } from 'app/endpoints/firestore-endpoint/article/firestore.article.service';
import { UntypedArticle } from 'app/models/article';
import { ArticleFileExistsError } from 'app/admin/pages/library/crud/article-crud/controls/upload-article/article.error';

@Injectable()
export class ArticleFileRepository {

  private get currentFile(): IF_ArticleFile {
    return this.currentFile$.getValue();
  }

  private set currentFile(file: IF_ArticleFile) {
    this.currentFile$.next(file);
  }

  private operationType: ArticleCrudType;
  private initialFile: IF_ArticleFile;

  private currentFile$: BehaviorSubject<IF_ArticleFile> = new BehaviorSubject<IF_ArticleFile>(null);

  constructor(private articleFileEndpoint: ArticleFileEndpoint,
              private articleService: FirestoreArticleService) {}

  selectArticleFile(): Observable<IF_ArticleFile> {
    return this.currentFile$.asObservable();
  }

  checkIfFileExists(fileName: string): Observable<ArticleFileExistsError> {

    return this.articleFileEndpoint.checkIfFileExists(fileName)
               .pipe(
                 switchMap((exists: boolean) => {
                   if (exists) {
                     return this.articleService.getArticleByFile(fileName)
                                .pipe(
                                  map((article: UntypedArticle) => {

                                    if (!article) {
                                      return null;
                                    }

                                    const exception: ArticleFileExistsError = {
                                      articleId: article.id
                                    };
                                    return exception;
                                  })
                                );
                   } else {
                     return of(null);
                   }
                 })
               );

  }

  remove(): Observable<void> {

    if (!this.currentFile)
      return of(null);

    let removed$: Observable<void>;

    switch (this.operationType) {

      case ArticleCrudType.CREATE: {
        removed$ = this.articleFileEndpoint.remove(this.currentFile);
        break;
      }

      case ArticleCrudType.EDIT: {

        if (!this.checkFilesEquality(this.initialFile, this.currentFile)) {
          removed$ = this.articleFileEndpoint.remove(this.currentFile);
        } else {
          removed$ = of(null);
        }

        break;
      }
    }

    this.currentFile = null;

    return removed$;

  }

  upload(file: ArticleFile): Observable<void> {

    if (this.currentFile)
      return of(null);

    const uploadTask = this.articleFileEndpoint.upload(file);
    const downloadUrl$ = uploadTask.downloadUrl;
    downloadUrl$
      .subscribe((url: string) => {

        if (url) {
          this.currentFile = {
            name: file.name,
            storagePath: uploadTask.storagePath,
            downloadUrl: url
          };
        } else {
          this.currentFile = null;
        }

      });

    return downloadUrl$
      .pipe(
        map(() => null)
      );
  }

  init(file: IF_ArticleFile, operationType: ArticleCrudType): void {

    this.operationType = operationType;

    if (file)
      this.initialFile = { ...file };

    this.currentFile = this.initialFile;

  }

  submitChanges(): void {

    switch (this.operationType) {

      case ArticleCrudType.EDIT: {

        if (!this.checkFilesEquality(this.initialFile, this.currentFile)) {
          this.articleFileEndpoint.remove(this.initialFile);
        }
        break;

      }

    }

  }

  cancelChanges(): void {

    switch (this.operationType) {

      case ArticleCrudType.CREATE: {
        this.currentFile && this.articleFileEndpoint.remove(this.currentFile);
        break;
      }

      case ArticleCrudType.EDIT: {

        if (!this.currentFile)
          return;

        if (!this.checkFilesEquality(this.initialFile, this.currentFile)) {
          this.articleFileEndpoint.remove(this.currentFile);
        }

        break;
      }

    }

  }

  private checkFilesEquality(a: IF_ArticleFile, b: IF_ArticleFile): boolean {
    return a === b;
  }

}
