import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatSidenavModule } from '@angular/material';

import { HeaderModule } from 'app/shared/templates/header/header.module';
import { PageLoadSpinnerModule } from 'app/page-load-spinner/page.load.spinner.module';
import { MenuModule } from 'app/shared/templates/menu/menu.module';
import { BasicWrapperComponent } from 'app/basic-wrapper/basic.wrapper.component';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';

const declarations = [
  BasicWrapperComponent
];

const providers = [
  BasicWrapperService
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
