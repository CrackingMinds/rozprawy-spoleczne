import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { libraryReducers } from 'app/admin/pages/library/store/reducers/library.reducer';
import { libraryEffects } from 'app/admin/pages/library/store/effects/library.effects';

import { MatProgressSpinnerModule } from '@angular/material';

import { LibraryComponent } from 'app/admin/pages/library/library.component';

import { ListOfIssuesModule } from 'app/admin/pages/library/list-of-issues/list.of.issues.module';
import { ListOfArticlesModule } from 'app/admin/pages/library/list-of-articles/list.of.articles.module';
import { RouterModule } from '@angular/router';


const declarations = [
  LibraryComponent
];

const providers = [

];

@NgModule({
  declarations: declarations,
  exports: declarations,
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: LibraryComponent
    }]),

    StoreModule.forFeature('library', libraryReducers),
    EffectsModule.forFeature(libraryEffects),

    MatProgressSpinnerModule,

    ListOfIssuesModule,
    ListOfArticlesModule
  ],
  providers: providers
})
export class LibraryModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LibraryModule,
      providers: providers
    };
  }

}
