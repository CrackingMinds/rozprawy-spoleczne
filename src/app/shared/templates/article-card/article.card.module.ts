import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatIconModule } from '@angular/material';

import { ArticleCardComponent } from 'app/shared/templates/article-card/article.card.component';

const declarations = [
  ArticleCardComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,

    MatIconModule,
    MatCardModule,

    RouterModule
  ]
})
export class ArticleCardModule {

}
