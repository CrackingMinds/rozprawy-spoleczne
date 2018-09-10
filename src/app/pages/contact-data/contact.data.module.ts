import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material';

import { ContactDataComponent } from 'app/pages/contact-data/contact.data.component';
import { ContactDataService } from 'app/pages/contact-data/contact.data.service';
import { PhoneNumModule } from 'app/shared/templates/phone-num/phone.num.module';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  ContactDataComponent
];

const providers = [
  ContactDataService
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: providers,
  imports: [
    MatIconModule,

    PhoneNumModule,
    BasicWrapperModule.forRoot()
  ]
})
export class ContactDataModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ContactDataModule,
      providers: providers
    };
  }

}
