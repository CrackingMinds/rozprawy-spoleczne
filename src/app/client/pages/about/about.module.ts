import { NgModule } from '@angular/core';

import { AboutComponent } from 'app/client/pages/about/about.component';

const declarations = [
  AboutComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
  ]
})
export class AboutModule {

}
