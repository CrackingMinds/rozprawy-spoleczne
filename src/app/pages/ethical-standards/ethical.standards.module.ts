import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material';

import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';
import { EthicalStandardsComponent } from 'app/pages/ethical-standards/ethical.standards.component';

const declarations = [
  EthicalStandardsComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    MatIconModule,

    BasicWrapperModule.forRoot()
  ]
})
export class EthicalStandardsModule {

}
