import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material';

import { EthicalStandardsComponent } from 'app/client/pages/ethical-standards/ethical.standards.component';

const declarations = [
  EthicalStandardsComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    MatIconModule
  ]
})
export class EthicalStandardsModule {

}
