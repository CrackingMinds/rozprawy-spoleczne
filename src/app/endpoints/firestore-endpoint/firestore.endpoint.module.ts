import { NgModule, ModuleWithProviders } from '@angular/core';

import { FirestoreArticleService } from 'app/endpoints/firestore-endpoint/article/firestore.article.service';
import { FirestoreArticleTypeService } from 'app/endpoints/firestore-endpoint/article-type/firestore.article.type.service';

const providers = [
  FirestoreArticleService,
  FirestoreArticleTypeService
];

@NgModule({
  providers: providers
})
export class FirestoreEndpointModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FirestoreEndpointModule,
      providers: providers
    };
  }

}
