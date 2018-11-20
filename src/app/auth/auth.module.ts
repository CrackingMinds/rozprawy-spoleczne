import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from 'app/auth/auth.component';
import { AuthGuard } from 'app/guards/auth.guard';

import { SigninModule } from 'app/auth/signin/signin.module';
import { SignupModule } from 'app/auth/signup/signup.module';

import 'app/auth/auth.component.scss';

const declarations = [
  AuthComponent
];

const providers = [
  AuthGuard
];

@NgModule({
  imports: [
    CommonModule,

    SignupModule,
    SigninModule
  ],
  declarations: declarations,
  exports: declarations,
  providers: providers
})
export class AuthModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: providers
    };
  }

}
