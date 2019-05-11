import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule } from '@angular/material';

import { SpinnerModule } from 'app/shared/templates/spinner/spinner.module';

import { UploadArticleComponent } from 'app/admin/pages/library/crud/article-crud/controls/upload-article/upload.article.component';

const declarations = [
  UploadArticleComponent
];

const providers = [
  // For the purpose of cancelling operations during which file was uploaded (and deleting that file) - don't provide UploadService here!! Instead provide
  // it in the component in which file was uploaded
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatIconModule,
    MatButtonModule,

    SpinnerModule
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
