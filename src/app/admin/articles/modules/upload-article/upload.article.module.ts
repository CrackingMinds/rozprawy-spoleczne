import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';

import { UploadArticleComponent } from 'app/admin/articles/modules/upload-article/upload.article.component';
import { UploadArticleService } from 'app/admin/articles/modules/upload-article/upload.article.service';

const declarations = [
  UploadArticleComponent
];

const providers = [
  UploadArticleService
];

@NgModule({
  imports: [
    CommonModule,

    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: declarations,
  providers: providers,
  exports: declarations
})
export class UploadArticleModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UploadArticleModule,
      providers: providers
    };
  }

}
