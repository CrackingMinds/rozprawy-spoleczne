import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/guards/auth.guard';
import { SigninComponent } from 'app/auth/signin/signin.component';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/client/client.module#ClientModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-in',
    component: SigninComponent
  },
];

const providers = [
  AuthGuard
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: providers
})
export class RoutingModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RoutingModule,
      providers: providers
    };
  }

}
