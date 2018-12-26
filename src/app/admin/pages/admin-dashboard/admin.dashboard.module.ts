import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminDashboardComponent } from 'app/admin/pages/admin-dashboard/admin.dashboard.component';

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
    }])
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
