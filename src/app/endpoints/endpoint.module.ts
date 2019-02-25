import { NgModule, ModuleWithProviders } from '@angular/core';

import { FirestoreEndpointModule } from 'app/endpoints/firestore-endpoint/firestore.endpoint.module';

import { ENDPOINT_URL } from 'app/endpoints/endpoint.tokens';

import { ArticleEndpoint } from 'app/endpoints/endpoint/article/article.endpoint';
import { FirestoreArticleEndpoint } from 'app/endpoints/firestore-endpoint/article/firestore.article.endpoint';

import { ArticleTypeEndpoint } from 'app/endpoints/endpoint/article-type/article.type.endpoint';
import { FirestoreArticleTypeEndpoint } from 'app/endpoints/firestore-endpoint/article-type/firestore.article.type.endpoint';

import { ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';
import { RestContactInfoEndpoint } from 'app/endpoints/rest-endpoint/contact-info/rest.contact.info.endpoint';

import { EditorialScientificBoardEndpoint } from 'app/endpoints/endpoint/editorial-and-scientific-board/editorial.scientific.board.endpoint';
import { RestEditorialScientificBoardEndpoint } from 'app/endpoints/rest-endpoint/editorial-and-scientific-board/rest.editorial.scientific.board.endpoint';

import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';
import { RestIndexingInfoEndpoint } from 'app/endpoints/rest-endpoint/indexing-info/rest.indexing.info.endpoint';

import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';
import { FirestoreIssueEndpoint } from 'app/endpoints/firestore-endpoint/issue/firestore.issue.endpoint';

import { ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';
import { RestReviewersEndpoint } from 'app/endpoints/rest-endpoint/reviewers/rest.reviewers.endpoint';

import { SubscriptionsEndpoint } from 'app/endpoints/endpoint/subscriptions/subscriptions.endpoint';
import { RestSubscriptionsEndpoint } from 'app/endpoints/rest-endpoint/subscriptions/rest.subscriptions.endpoint';

import { ArticleFileEndpoint } from 'app/endpoints/endpoint/article-file/article.file.endpoint';
import { FirestorageArticleFileEndpoint } from 'app/endpoints/firestorage-endpoint/article-file/firestorage.article.file.endpoint';

import { EditorialBoardEndpoint } from 'app/endpoints/endpoint/editorial-board/editorial.board.endpoint';
import { FirestoreEditorialBoardEndpoint } from 'app/endpoints/firestore-endpoint/editorial-board/firestore.editorial.board.endpoint';

import { ScientificBoardEndpoint } from 'app/endpoints/endpoint/scientific-board/scientific.board.endpoint';
import { FirestoreScientificBoardEndpoint } from 'app/endpoints/firestore-endpoint/scientific-board/firestore.scientific.board.endpoint';

const providers = [
  {
    provide: ENDPOINT_URL,
    useValue: 'http://api.rozprawyspoleczne.edu.pl'
  },
  {
    provide: IssueEndpoint,
    useClass: FirestoreIssueEndpoint
  },
  {
    provide: ArticleEndpoint,
    useClass: FirestoreArticleEndpoint
  },
  {
    provide: ArticleTypeEndpoint,
    useClass: FirestoreArticleTypeEndpoint
  },
  {
    provide: ContactInfoEndpoint,
    useClass: RestContactInfoEndpoint
  },
  {
    provide: EditorialScientificBoardEndpoint,
    useClass: RestEditorialScientificBoardEndpoint
  },
  {
    provide: IndexingInfoEndpoint,
    useClass: RestIndexingInfoEndpoint
  },
  {
    provide: ReviewersEndpoint,
    useClass: RestReviewersEndpoint
  },
  {
    provide: SubscriptionsEndpoint,
    useClass: RestSubscriptionsEndpoint
  },
  {
    provide: ArticleFileEndpoint,
    useClass: FirestorageArticleFileEndpoint
  },
  {
    provide: EditorialBoardEndpoint,
    useClass: FirestoreEditorialBoardEndpoint
  },
  {
    provide: ScientificBoardEndpoint,
    useClass: FirestoreScientificBoardEndpoint
  }
];

@NgModule({
	providers: providers,
  imports: [
    FirestoreEndpointModule
  ]
})
export class EndpointModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EndpointModule,
      providers: providers
    };
  }

}
