import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneNumComponent } from 'app/shared/templates/phone-num/phone.num.component';
import { PhoneNumPipe } from 'app/shared/pipes/phone-num.pipe';

const declarations = [
  PhoneNumComponent,
  PhoneNumPipe
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule
  ]
})
export class PhoneNumModule {

}
