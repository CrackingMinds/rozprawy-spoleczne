import { NgModule } from '@angular/core';

import { PhoneNumPipe } from 'app/shared/pipes/phone-num.pipe';
import { IssueStringPipe } from 'app/shared/pipes/issue.string.pipe';

const declarations = [
  PhoneNumPipe,
  IssueStringPipe
];

@NgModule({
  imports: [

  ],
  declarations: declarations,
  exports: declarations
})
export class CustomPipesModule {

}
