import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SignupComponent } from 'app/auth/signup/signup.component';
import { AuthModule } from 'app/auth/auth.module';

const declarations = [
  SignupComponent
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
export class SignupModule {

}
