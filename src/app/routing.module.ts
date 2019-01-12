import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from 'app/guards/admin.guard';
import { SigninGuard } from 'app/guards/signin.guard';

import { SigninComponent } from 'app/auth/signin/signin.component';

import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';
import { AdminRoutesResolver } from 'app/shared/routing-helpers/admin.routes.resolver';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/client/client.module#ClientModule'
  },
  {
    path: AdminRoutesResolver.admin,
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [AdminGuard]
  },
  {
    path: RoutesResolver.signIn,
    component: SigninComponent,
    canActivate: [SigninGuard]
  },
];

const providers = [
  AdminGuard,
  SigninGuard
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
