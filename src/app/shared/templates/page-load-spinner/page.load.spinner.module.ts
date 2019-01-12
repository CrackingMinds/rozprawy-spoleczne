import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PageLoadSpinnerComponent } from 'app/shared/templates/page-load-spinner/page.load.spinner.component';

const declarations = [
  PageLoadSpinnerComponent
];

const providers = [
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: providers,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class PageLoadSpinnerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PageLoadSpinnerModule,
      providers: providers
    };
  }
}
