import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material';

import { MenuComponent } from 'app/shared/templates/menu/menu.component';
import { PhoneNumModule } from 'app/shared/templates/phone-num/phone.num.module';

const declarations = [
  MenuComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    RouterModule,

    MatIconModule,

    PhoneNumModule
  ]
})
export class MenuModule {

}
