import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsComponent } from 'app/client/pages/subscriptions/subscriptions.component';

const declarations = [
  SubscriptionsComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule
  ]
})
export class SubscriptionsModule {

}
