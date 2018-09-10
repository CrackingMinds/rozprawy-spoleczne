import { ModuleWithProviders, NgModule } from '@angular/core';
import { PageLoadSpinnerService } from 'app/page-load-spinner/page.load.spinner.service';
import { PageLoadSpinnerComponent } from 'app/page-load-spinner/page.load.spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const declarations = [
  PageLoadSpinnerComponent
];

const providers = [
  PageLoadSpinnerService
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: providers,
  imports: [
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
