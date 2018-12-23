import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material';

import { ContactDataComponent } from 'app/pages/contact-data/contact.data.component';
import { PhoneNumModule } from 'app/shared/templates/phone-num/phone.num.module';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  ContactDataComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    MatIconModule,

    PhoneNumModule,
    BasicWrapperModule.forRoot()
  ]
})
export class ContactDataModule {
}
