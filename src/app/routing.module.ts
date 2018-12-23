import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/guards/auth.guard';
import { SigninComponent } from 'app/auth/signin/signin.component';

import { RoutesResolver } from 'app/routes-resolver/routes.resolver';
import { AdminRoutesResolver } from 'app/routes-resolver/admin.routes.resolver';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/client/client.module#ClientModule'
  },
  {
    path: AdminRoutesResolver.admin,
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  {
    path: RoutesResolver.signIn,
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
