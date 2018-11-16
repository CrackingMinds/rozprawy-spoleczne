import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IArticle } from 'app/models/article';

import { FirestoreArticleService } from 'app/services/firestore/article.service';

@Injectable()
export class ArticleService {

  constructor(private firestoreArticleService: FirestoreArticleService) {
  }

  getArticlesInIssue(issueId: string): Observable<IArticle[]> {
    return this.firestoreArticleService.getArticlesInIssue(issueId);
  }

  // postArticle(article: IFirestoreArticle): Promise<void> {
  //   return new Promise<void>(resolve => {
  //     this.angularFirestore.collection(ArticleService.collectionName).add(article).then((doc: DocumentReference) => {
  //       resolve();
  //     });
  //   });
  // }

}
