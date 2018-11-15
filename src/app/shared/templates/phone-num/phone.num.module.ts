import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneNumComponent } from 'app/shared/templates/phone-num/phone.num.component';
import { CustomPipesModule } from 'app/shared/pipes/custom.pipes.module';

const declarations = [
  PhoneNumComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    CustomPipesModule
  ]
})
export class PhoneNumModule {

}
