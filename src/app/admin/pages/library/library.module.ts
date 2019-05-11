import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SpinnerModule } from 'app/shared/templates/spinner/spinner.module';
import { ModalModule } from 'app/admin/pages/library/modal/modal.module';

import { libraryStoreFeatureName } from 'app/admin/pages/library/store/store.feature.name';
import { libraryReducers } from 'app/admin/pages/library/store/reducers/library.reducer';
import { libraryEffects } from 'app/admin/pages/library/store/effects/library.effects';

import { LibraryComponent } from 'app/admin/pages/library/library.component';

import { ListOfIssuesModule } from 'app/admin/pages/library/list-of-issues/list.of.issues.module';
import { ListOfArticlesModule } from 'app/admin/pages/library/list-of-articles/list.of.articles.module';

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

    StoreModule.forFeature(libraryStoreFeatureName, libraryReducers),
    EffectsModule.forFeature(libraryEffects),

    SpinnerModule,
    ModalModule.forRoot(),

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
