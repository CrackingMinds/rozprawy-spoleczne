import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsComponent } from 'app/pages/subscriptions/subscriptions.component';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  SubscriptionsComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    BasicWrapperModule.forRoot()
  ]
})
export class SubscriptionsModule {

}
