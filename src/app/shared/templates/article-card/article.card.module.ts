import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatIconModule } from '@angular/material';

import { ArticleCardComponent } from 'app/shared/templates/article-card/article.card.component';
import { CustomPipesModule } from 'app/shared/pipes/custom.pipes.module';

const declarations = [
  ArticleCardComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    RouterModule,

    MatIconModule,
    MatCardModule,

    CustomPipesModule.forRoot()
  ]
})
export class ArticleCardModule {

}
