import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsComponent } from 'app/pages/subscriptions/subscriptions.component';
import { SubscriptionsService } from 'app/pages/subscriptions/subscriptions.service';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  SubscriptionsComponent
];

const providers = [
  SubscriptionsService
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: providers,
  imports: [
    CommonModule,

    BasicWrapperModule.forRoot()
  ]
})
export class SubscriptionsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SubscriptionsModule,
      providers: providers
    };
  }

}
