import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { indexingStoreFeatureName } from 'app/admin/pages/indexing/store/store.feature.name';
import { indexingReducer } from 'app/admin/pages/indexing/store/reducers/indexing.reducer';
import { IndexingEffects } from 'app/admin/pages/indexing/store/effects/indexing.effects';

import { MatProgressSpinnerModule } from '@angular/material';

import { IndexingEditComponent } from 'app/admin/pages/indexing/indexing.edit.component';

import { ListOfControlsModule } from 'app/shared/form-controls/list-of-controls/list.of.controls.module';
import { IndexingInfoItemControlModule } from 'app/shared/form-controls/indexing-info-item/indexing.info.item.control.module';

const declarations = [
  IndexingEditComponent
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: IndexingEditComponent
    }]),

    StoreModule.forFeature(indexingStoreFeatureName, indexingReducer),
    EffectsModule.forFeature([IndexingEffects]),

    MatProgressSpinnerModule,

    ListOfControlsModule,
    IndexingInfoItemControlModule
  ],
	declarations: declarations,
	exports: declarations
})
export class IndexingEditModule {
}
