import { NgModule, ModuleWithProviders } from '@angular/core';

import { PageNameService } from 'app/shared/services/page.name.service';

import { EndpointServicesModule } from 'app/services/endpoint/endpoint.services.module';

const providers = [
  PageNameService
];

@NgModule({
  imports: [
    EndpointServicesModule.forRoot()
  ],
  providers: providers
})
export class ServicesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: providers
    };
  }

}
