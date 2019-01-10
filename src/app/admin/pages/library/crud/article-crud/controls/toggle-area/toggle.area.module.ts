import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material';

import { ToggleAreaComponent } from 'app/admin/pages/library/crud/article-crud/controls/toggle-area/toggle.area.component';


const declarations = [
  ToggleAreaComponent
];

const providers = [

];

@NgModule({
  declarations: declarations,
  exports: declarations,
  providers: providers,
  imports: [
    CommonModule,

    MatSlideToggleModule,
  ]
})
export class ToggleAreaModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToggleAreaModule,
      providers: providers
    };
  }

}
