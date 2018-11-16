import { Injectable } from '@angular/core';

import { Observable, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { IIssue } from 'app/models/issue';
import { IArticle } from 'app/models/article';
import { IArticleType } from 'app/models/article.type';
import { Author } from 'app/models/author';
import { ArticleFile } from 'app/models/article.file';

import { FirestoreArticleTypeService } from 'app/services/firestore/article.types.service';

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
export class FirestoreArticleService {

  private static collectionName: string = 'articles';

  constructor(private angularFirestore: AngularFirestore,
              private firestoreArticleTypeService: FirestoreArticleTypeService) {}

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

  hasArticles(issue: IIssue): Observable<boolean> {
    return this.getArticlesFromFirestore(issue.id)
               .pipe(
                 map((articles: IFirestoreArticleWithId[]) => {
                   return articles.length > 0;
                 })
               );
  }

  private getArticlesFromFirestore(issueId: string): Observable<IFirestoreArticleWithId[]> {
    let issueArticlesCollection = this.angularFirestore.collection<IFirestoreArticle>(FirestoreArticleService.collectionName, ref => ref.where('issueId', '==', issueId));
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
    return this.firestoreArticleTypeService.getArticleType(article.articleTypeId)
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
