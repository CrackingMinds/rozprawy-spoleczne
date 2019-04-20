import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reviewersStoreFeatureName } from 'app/admin/pages/reviewers/store/store.feature.name';
import { reviewersRootReducers } from 'app/admin/pages/reviewers/store/reducers/reviewers.root.reducer';
import { reviewersRootEffects } from 'app/admin/pages/reviewers/store/effects/reviewers.root.effects';

import { MatProgressSpinnerModule } from '@angular/material';

import { ReviewersEditComponent } from 'app/admin/pages/reviewers/reviewers.edit.component';

import { ListOfYearsModule } from 'app/admin/pages/reviewers/list-of-years/list.of.years.module';
import { ListOfReviewersModule } from 'app/admin/pages/reviewers/list-of-reviewers/list.of.reviewers.module';

const declarations = [
  ReviewersEditComponent
];

@NgModule({
	imports: [
		CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ReviewersEditComponent
    }]),

    StoreModule.forFeature(reviewersStoreFeatureName, reviewersRootReducers),
    EffectsModule.forFeature(reviewersRootEffects),

    MatProgressSpinnerModule,

    ListOfYearsModule,
    ListOfReviewersModule
	],
	declarations: declarations,
	exports: declarations
})
export class ReviewersEditModule {
}
