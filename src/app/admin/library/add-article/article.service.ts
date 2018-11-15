import { Injectable } from '@angular/core';

import { Observable, zip, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';

import { IArticle } from 'app/models/article';
import { IArticleType } from 'app/models/article.type';
import { ArticleTypesService } from 'app/services/article.types.service';
import { Author } from 'app/models/author';
import { ArticleFile } from 'app/models/article.file';

interface IFirestoreArticle {
  articleTypeId: string;
  title: string;
  authors: Author[];
  pages: string;
  doi: string;
  introduction: string;
  materialsAndMethods: string;
  results: string;
  conclusions: string;
  keywords: string;
  pdf: ArticleFile;
  issueId: string;
}

interface IFirestoreArticleWithId {
  id: string;
  articleTypeId: string;
  title: string;
  authors: Author[];
  pages: string;
  doi: string;
  introduction: string;
  materialsAndMethods: string;
  results: string;
  conclusions: string;
  keywords: string;
  pdf: ArticleFile;
  issueId: string;
}

@Injectable()
export class ArticleService {

  private static collectionName: string = 'articles';

  constructor(private angularFirestore: AngularFirestore,
              private articleTypesService: ArticleTypesService) {
  }

  getArticlesInIssue(issueId: string): Observable<IArticle[]> {

    let article$: Observable<IFirestoreArticleWithId[]> = this.getArticlesFromFirestore(issueId);
    return article$
      .pipe(
        switchMap((articles: IFirestoreArticleWithId[]) => {
          if (articles.length === 0) {
            return of([]);
          }
          return this.getArticleTypeForEachArticle(articles);
        })
      );
  }

  postArticle(article: IFirestoreArticle): Promise<void> {
    return new Promise<void>(resolve => {
      this.angularFirestore.collection(ArticleService.collectionName).add(article).then((doc: DocumentReference) => {
        resolve();
      });
    });
  }

  private getArticlesFromFirestore(issueId: string): Observable<IFirestoreArticleWithId[]> {
    let issueArticlesCollection = this.angularFirestore.collection<IFirestoreArticle>(ArticleService.collectionName, ref => ref.where('issueId', '==', issueId));
    return issueArticlesCollection.snapshotChanges()
                                  .pipe(
                                    map(actions => actions.map(
                                      a => {
                                        let data = a.payload.doc.data() as IFirestoreArticle;
                                        return {
                                          id: a.payload.doc.id,
                                          ...data
                                        };
                                      }
                                    ))
                                  );
  }

  private getArticleTypeForEachArticle(articles: IFirestoreArticleWithId[]): Observable<IArticle[]> {

    let arr: Observable<IArticle>[] = articles.map((article: IFirestoreArticleWithId) => {
      return this.getArticleWithArticleType(article);
    });

    let zipped: Observable<IArticle[]> = zip(
      ...arr
    );

    return zipped;
  }

  private getArticleWithArticleType(article: IFirestoreArticleWithId): Observable<IArticle> {
    return this.articleTypesService.getArticleType(article.articleTypeId)
               .pipe(
                 map((articleType: IArticleType) => {
                   // @TODO: think about this again
                   delete article.articleTypeId;
                   return {
                     ...article,
                     articleType: articleType
                   };
                 })
               );
  }
}
