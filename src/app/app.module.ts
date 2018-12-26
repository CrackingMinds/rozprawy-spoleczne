import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from 'app/auth/auth.module';
import { RoutingModule } from 'app/routing.module';
import { FirebaseConfigModule } from 'app/firebase.config.module';

import { ServicesModule } from 'app/services/services.module';

import { EndpointModule } from 'app/endpoints/endpoint.module';

import { AppComponent } from 'app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    EndpointModule.forRoot(),

    AuthModule.forRoot(),
    RoutingModule.forRoot(),
    FirebaseConfigModule,

    ServicesModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
