import { NgModule, ModuleWithProviders } from '@angular/core';

import { PageNameService } from 'app/shared/services/page.name.service';

const providers = [
  PageNameService
];

@NgModule({
  imports: [],
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
