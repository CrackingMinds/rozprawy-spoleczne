import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SigninComponent } from 'app/auth/signin/signin.component';
import { AuthModule } from 'app/auth/auth.module';

const declarations = [
  SigninComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    AuthModule.forRoot()
  ]
})
export class SigninModule {

}
