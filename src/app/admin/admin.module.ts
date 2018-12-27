import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { adminReducer } from 'app/admin/store/admin.reducer';

import { environment } from 'environments/environment';

import { AdminComponent } from 'app/admin/admin.component';
import { AdminRoutingModule } from 'app/admin/admin.routing.module';
import { MatButtonModule } from '@angular/material';

const declarations = [
  AdminComponent
];

const providers = [

];

const devOnlyModules = [
  StoreDevtoolsModule.instrument()
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    StoreModule.forRoot(adminReducer),
    EffectsModule.forRoot([]),

    StoreRouterConnectingModule,

    MatButtonModule,

    AdminRoutingModule,

    environment.production ? [] : [...devOnlyModules]
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
