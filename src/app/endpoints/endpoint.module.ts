import { NgModule, ModuleWithProviders } from '@angular/core';

import { FirestoreEndpointModule } from 'app/endpoints/firestore-endpoint/firestore.endpoint.module';
import { FirestorageArticleFileEndpointModule } from 'app/endpoints/firestorage-endpoint/article-file/firestorage.article.file.endpoint.module';

import { EndpointErrorHandler } from 'app/endpoints/endpoint.error.handler';

import { ENDPOINT_URL } from 'app/endpoints/endpoint.tokens';

import { ArticleEndpoint } from 'app/endpoints/endpoint/article/article.endpoint';
import { FirestoreArticleEndpoint } from 'app/endpoints/firestore-endpoint/article/firestore.article.endpoint';

import { ArticleTypeEndpoint } from 'app/endpoints/endpoint/article-type/article.type.endpoint';
import { FirestoreArticleTypeEndpoint } from 'app/endpoints/firestore-endpoint/article-type/firestore.article.type.endpoint';

import { ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';
import { RestContactInfoEndpoint } from 'app/endpoints/rest-endpoint/contact-info/rest.contact.info.endpoint';

import { EditorialScientificBoardEndpoint } from 'app/endpoints/endpoint/editorial-and-scientific-board/editorial.scientific.board.endpoint';
import { RestEditorialScientificBoardEndpoint } from 'app/endpoints/rest-endpoint/editorial-and-scientific-board/rest.editorial.scientific.board.endpoint';

import { INDEXING_INFO_ENDPOINT } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';
import { FirestoreIndexingInfoEndpoint } from 'app/endpoints/firestore-endpoint/indexing-info/firestore.indexing.info.endpoint';

import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';
import { FirestoreIssueEndpoint } from 'app/endpoints/firestore-endpoint/issue/firestore.issue.endpoint';

import { REVIEWERS_ENDPOINT } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';
import { FirestoreReviewersEndpoint } from 'app/endpoints/firestore-endpoint/reviewers/firestore.reviewers.endpoint';

import { ReviewerYearsEndpoint } from 'app/endpoints/endpoint/reviewer-years/reviewer.years.endpoint';
import { FirestoreReviewerYearsEndpoint } from 'app/endpoints/firestore-endpoint/reviewer-years/firestore.reviewer.years.endpoint';

import { SubscriptionsEndpoint } from 'app/endpoints/endpoint/subscriptions/subscriptions.endpoint';
import { RestSubscriptionsEndpoint } from 'app/endpoints/rest-endpoint/subscriptions/rest.subscriptions.endpoint';

import { EditorialBoardEndpoint } from 'app/endpoints/endpoint/editorial-board/editorial.board.endpoint';
import { FirestoreEditorialBoardEndpoint } from 'app/endpoints/firestore-endpoint/editorial-board/firestore.editorial.board.endpoint';

import { ScientificBoardEndpoint } from 'app/endpoints/endpoint/scientific-board/scientific.board.endpoint';
import { FirestoreScientificBoardEndpoint } from 'app/endpoints/firestore-endpoint/scientific-board/firestore.scientific.board.endpoint';

const providers = [
  EndpointErrorHandler,
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
    provide: INDEXING_INFO_ENDPOINT,
    useClass: FirestoreIndexingInfoEndpoint
  },
  {
    provide: REVIEWERS_ENDPOINT,
    useClass: FirestoreReviewersEndpoint
  },
  {
    provide: ReviewerYearsEndpoint,
    useClass: FirestoreReviewerYearsEndpoint
  },
  {
    provide: SubscriptionsEndpoint,
    useClass: RestSubscriptionsEndpoint
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
    FirestoreEndpointModule,
    FirestorageArticleFileEndpointModule.forRoot()
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
