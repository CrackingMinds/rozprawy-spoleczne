import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';

import { ArticleUploadComponent } from 'app/article-upload/article.upload.component';
import { ArticleUploadService } from 'app/article-upload/article.upload.service';

const declarations = [
  ArticleUploadComponent
];

const providers = [
  ArticleUploadService
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
export class ArticleUploadModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ArticleUploadModule,
      providers: providers
    };
  }

}
