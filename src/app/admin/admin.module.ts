import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from 'app/admin/admin.component';
import { AdminRoutingModule } from 'app/admin/admin.routing.module';

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
    AdminRoutingModule
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
