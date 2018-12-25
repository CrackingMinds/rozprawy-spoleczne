import { NgModule, ModuleWithProviders } from '@angular/core';

import { PhoneNumPipe } from 'app/shared/pipes/phone-num.pipe';
import { IssueStringPipe } from 'app/shared/pipes/issue.string.pipe';
import { AuthorPipe } from 'app/shared/pipes/author.pipe';

const declarations = [
  PhoneNumPipe,
  IssueStringPipe,
  AuthorPipe
];

const providers = declarations;

@NgModule({
  imports: [

  ],
  declarations: declarations,
  providers: providers,
  exports: declarations
})
export class CustomPipesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomPipesModule,
      providers: providers
    };
  }

}
