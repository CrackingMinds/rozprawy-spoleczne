import { Injectable } from '@angular/core';

import { Observable, Observer, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { IIssue } from 'app/models/issue';
import { ArticleWithId, ArticleWithTypeId, IArticle, RawArticle, RawArticleWithTypeId } from 'app/models/article';
import { IArticleType } from 'app/models/article.type';

import { FirestoreArticleTypeService } from 'app/services/firestore/article.types.service';
import { ArticleCrudService } from 'app/services/article.crud.service';

type FirestoreArticle = RawArticle & ArticleWithTypeId;
type FirestoreArticleWithId = FirestoreArticle & ArticleWithId;

@Injectable()
export class FirestoreArticleService implements ArticleCrudService {

  private static collectionName: string = 'articles';

  constructor(private angularFirestore: AngularFirestore,
              private firestoreArticleTypeService: FirestoreArticleTypeService) {}

  getArticlesInIssue(issueId: string): Observable<IArticle[]> {

    let article$: Observable<FirestoreArticleWithId[]> = this.getArticlesFromFirestore(issueId);
    return article$
      .pipe(
        switchMap((articles: FirestoreArticleWithId[]) => {
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
                 map((articles: FirestoreArticleWithId[]) => {
                   return articles.length > 0;
                 })
               );
  }

  postArticle(article: RawArticleWithTypeId): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      this.angularFirestore.collection(FirestoreArticleService.collectionName).add(article)
          .then(() => {
            observer.next(null);
            observer.complete();
          })
          .catch((reason) => observer.error(reason));
    });

  }

  private getArticlesFromFirestore(issueId: string): Observable<FirestoreArticleWithId[]> {
    let issueArticlesCollection = this.angularFirestore.collection<FirestoreArticle>(FirestoreArticleService.collectionName, ref => ref.where('issueId', '==', issueId));
    return issueArticlesCollection.snapshotChanges()
                                  .pipe(
                                    map(actions => actions.map(
                                      a => {
                                        let data = a.payload.doc.data() as FirestoreArticle;
                                        return {
                                          id: a.payload.doc.id,
                                          ...data
                                        };
                                      }
                                    ))
                                  );
  }

  private getArticleTypeForEachArticle(articles: FirestoreArticleWithId[]): Observable<IArticle[]> {

    let arr: Observable<IArticle>[] = articles.map((article: FirestoreArticleWithId) => {
      return this.getArticleWithArticleType(article);
    });

    let zipped: Observable<IArticle[]> = zip(
      ...arr
    );

    return zipped;
  }

  private getArticleWithArticleType(article: FirestoreArticleWithId): Observable<IArticle> {
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
