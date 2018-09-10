import { ModuleWithProviders, NgModule } from '@angular/core';

import { BasicWrapperComponent } from 'app/basic-wrapper/basic.wrapper.component';
import { MatIconModule, MatSidenavModule } from '@angular/material';
import { HeaderModule } from 'app/shared/templates/header/header.module';
import { CommonModule } from '@angular/common';
import { PageLoadSpinnerModule } from 'app/page-load-spinner/page.load.spinner.module';
import { ApiService } from 'app/services/api.service';
import { MainSpinnerService } from 'app/services/main-spinner/main.spinner.service';
import { SpinnerService } from 'app/services/spinner/spinner.service';
import { MenuModule } from 'app/shared/templates/menu/menu.module';
import { PageNameService } from 'app/shared/services/page.name.service';

const declarations = [
  BasicWrapperComponent
];

const providers = [
  ApiService,
  SpinnerService,
  MainSpinnerService,
  PageNameService,
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    MatSidenavModule,
    MatIconModule,
    MatSidenavModule,

    HeaderModule,
    MenuModule,
    PageLoadSpinnerModule.forRoot()
  ],
  providers: providers
})
export class BasicWrapperModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BasicWrapperModule,
      providers: providers
    };
  }

}
