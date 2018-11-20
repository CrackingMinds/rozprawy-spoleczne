import { environment } from 'environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { appReducers, CustomSerializer } from 'app/store/reducers/app.reducers';
import { RouterEffects } from 'app/store/effects/router.effects';

import { AuthModule } from 'app/auth/auth.module';
import { RoutingModule } from 'app/routing.module';
import { FirebaseConfigModule } from 'app/firebase.config.module';

import { ServicesModule } from 'app/services/services.module';

import { ClientModule } from 'app/client/client.module';
import { AdminModule } from 'app/admin/admin.module';

import { ModalModule } from 'app/admin/library/list-of-issues/modals/modal/modal.module';

import { AppComponent } from 'app/app.component';

const devOnlyModules = [
  StoreDevtoolsModule.instrument()
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([
      RouterEffects
    ]),
    StoreRouterConnectingModule,

    AuthModule.forRoot(),
    RoutingModule.forRoot(),
    FirebaseConfigModule,

    ServicesModule.forRoot(),

    ClientModule.forRoot(),
    AdminModule.forRoot(),

    ModalModule,

    environment.production ? [] : [...devOnlyModules]
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
