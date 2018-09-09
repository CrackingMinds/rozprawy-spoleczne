import { NgModule } from '@angular/core';

import { PlaygroundComponent } from 'app/pages/playground/playground.component';
import { ArticleUploadModule } from 'app/article-upload/article.upload.module';

const declarations = [
  PlaygroundComponent
];

@NgModule({
  declarations: declarations,
  imports: [
    ArticleUploadModule.forRoot()
  ],
  exports: declarations
})
export class PlaygroundModule {

}
