import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material';

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
    CommonModule,

    RouterModule.forChild([{
      path: '',
      component: AdminDashboardComponent
    }]),

    MatCardModule
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
