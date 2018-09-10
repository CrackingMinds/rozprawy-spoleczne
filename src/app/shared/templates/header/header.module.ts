import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';

import { HeaderComponent } from 'app/shared/templates/header/header.component';

const declarations = [
  HeaderComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class HeaderModule {

}
