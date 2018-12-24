import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material';

import { AuthorRequirementsComponent } from 'app/pages/author-requirements/author.requirements.component';
import { PhoneNumModule } from 'app/shared/templates/phone-num/phone.num.module';

const declarations = [
  AuthorRequirementsComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    MatIconModule,

    PhoneNumModule
  ]
})
export class AuthorRequirementsModule {

}
