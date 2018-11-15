import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { libraryReducers } from 'app/admin/library/store/reducers/library.reducer';
import { libraryEffects } from 'app/admin/library/store/effects/library.effects';

import { MatProgressSpinnerModule } from '@angular/material';

import { LibraryComponent } from 'app/admin/library/library.component';

import { ListOfIssuesModule } from 'app/admin/library/list-of-issues/list.of.issues.module';
import { ListOfArticlesModule } from 'app/admin/library/list-of-articles/list.of.articles.module';


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
