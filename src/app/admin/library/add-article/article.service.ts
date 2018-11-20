import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IArticle, RawArticleWithTypeId } from 'app/models/article';

import { FirestoreArticleService } from 'app/services/crud/firestore/article.service';
import { ArticleCrudService } from 'app/services/crud/article.crud.service';

@Injectable()
export class ArticleService implements ArticleCrudService {

  constructor(private firestoreArticleService: FirestoreArticleService) {
  }

  getArticlesInIssue(issueId: string): Observable<IArticle[]> {
    return this.firestoreArticleService.getArticlesInIssue(issueId);
  }

  postArticle(article: RawArticleWithTypeId): Observable<void> {
    return this.firestoreArticleService.postArticle(article);
  }

}
