import { NgModule } from '@angular/core';

import { AboutComponent } from 'app/pages/about/about.component';
import { BasicWrapperModule } from 'app/basic-wrapper/basic.wrapper.module';

const declarations = [
  AboutComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    BasicWrapperModule.forRoot(),
  ]
})
export class AboutModule {

}
