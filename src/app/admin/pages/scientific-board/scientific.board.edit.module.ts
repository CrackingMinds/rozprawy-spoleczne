import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatIconModule } from '@angular/material';

import { SpinnerModule } from 'app/shared/templates/spinner/spinner.module';
import { ListOfControlsModule } from 'app/shared/form-controls/list-of-controls/list.of.controls.module';
import { ModalModule } from 'app/admin/pages/library/modal/modal.module';

import { scientificBoardStoreFeatureName } from 'app/admin/pages/scientific-board/store/store.feature.name';
import { scientificBoardReducer } from 'app/admin/pages/scientific-board/store/reducers/scientific.board.reducer';
import { ScientificBoardEffects } from 'app/admin/pages/scientific-board/store/effects/scientific.board.effects';

import { ScientificBoardEditComponent } from 'app/admin/pages/scientific-board/scientific.board.edit.component';

import { ScientificBoardMemberControlModule } from 'app/shared/form-controls/scientific-board-member/scientific.board.member.control.module';

const declarations = [
  ScientificBoardEditComponent
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: ScientificBoardEditComponent
    }]),

    StoreModule.forFeature(scientificBoardStoreFeatureName, scientificBoardReducer),
    EffectsModule.forFeature([ScientificBoardEffects]),

    MatIconModule,

    SpinnerModule,
    ModalModule.forRoot(),
    ListOfControlsModule,

    ScientificBoardMemberControlModule
	],
	declarations: declarations,
	exports: declarations
})
export class ScientificBoardEditModule {
}
