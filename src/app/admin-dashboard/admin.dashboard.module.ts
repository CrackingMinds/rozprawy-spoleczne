import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminDashboardComponent } from 'app/admin-dashboard/admin.dashboard.component';

import { LibraryModule } from 'app/admin/library/library.module';

const declarations = [
  AdminDashboardComponent
];

const providers = [

];

@NgModule({
  declarations: declarations,
  exports: [
    ...declarations,
    RouterModule
  ],
  providers: providers,
  imports: [
    RouterModule.forChild([{
      path: '',
      component: AdminDashboardComponent
    }]),

    LibraryModule.forRoot()
  ]
})
export class AdminDashboardModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminDashboardModule,
      providers: providers
    };
  }
}
