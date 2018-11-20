import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from 'app/admin/admin.component';

import { AdminDashboardModule } from 'app/admin-dashboard/admin.dashboard.module';

const declarations = [
  AdminComponent
];

const providers = [

];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    RouterModule,

    AdminDashboardModule
  ],
  providers: providers
})
export class AdminModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminModule,
      providers: providers
    };
  }

}
