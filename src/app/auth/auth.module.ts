import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninModule } from 'app/auth/signin/signin.module';

@NgModule({
  imports: [
    CommonModule,

    SigninModule
  ]
})
export class AuthModule {
}
