import { NgModule, ModuleWithProviders } from '@angular/core';

import { ENDPOINT_URL } from 'app/services/endpoint/endpoint.services.tokens';

import { ContactInfoService } from 'app/services/endpoint/contact-info/contact.info.service';
import { RestContactInfoService } from 'app/services/endpoint/contact-info/rest.contact.info.service';

import { IndexingInfoService } from 'app/services/endpoint/indexing-info/indexing.info.service';
import { RestIndexingInfoService } from 'app/services/endpoint/indexing-info/rest.indexing.info.service';

import { SubscriptionsInfoService } from 'app/services/endpoint/subscriptions/subscriptions.info.service';
import { RestSubscriptionsInfoService } from 'app/services/endpoint/subscriptions/rest.subscriptions.info.service';

import { EditorialScientificBoardService } from 'app/services/endpoint/editorial-and-scientific-board/editorial.scientific.board.service';
import { RestEditorialScientificBoardService } from 'app/services/endpoint/editorial-and-scientific-board/rest.editorial.scientific.board.service';

import { ReviewersService } from 'app/services/endpoint/reviewers/reviewers.service';
import { RestReviewersService } from 'app/services/endpoint/reviewers/rest.reviewers.service';

const providers = [
  {
    provide: ENDPOINT_URL,
    useValue: 'http://api.rozprawyspoleczne.edu.pl'
  },
  {
    provide: ContactInfoService,
    useClass: RestContactInfoService
  },
  {
    provide: IndexingInfoService,
    useClass: RestIndexingInfoService
  },
  {
    provide: SubscriptionsInfoService,
    useClass: RestSubscriptionsInfoService
  },
  {
    provide: EditorialScientificBoardService,
    useClass: RestEditorialScientificBoardService
  },
  {
    provide: ReviewersService,
    useClass: RestReviewersService
  }
];

@NgModule({
	providers: providers
})
export class EndpointServicesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EndpointServicesModule,
      providers: providers
    };
  }

}
