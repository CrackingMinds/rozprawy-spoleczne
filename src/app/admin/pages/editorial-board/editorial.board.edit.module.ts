import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { editorialBoardStoreFeatureName } from 'app/admin/pages/editorial-board/store/store.feature.name';
import { editorialBoardReducer } from 'app/admin/pages/editorial-board/store/reducers/editorial.board.reducer';
import { EditorialBoardEffects } from 'app/admin/pages/editorial-board/store/effects/editorial.board.effects';

import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';

import { EditorialBoardEditComponent } from 'app/admin/pages/editorial-board/editorial.board.edit.component';

import { ListOfControlsModule } from 'app/shared/form-controls/list-of-controls/list.of.controls.module';
import { EditorialBoardMemberControlModule } from 'app/shared/form-controls/editorial-board-member/editorial.board.member.control.module';
import { ModalModule } from 'app/admin/pages/library/modal/modal.module';

const declarations = [
  EditorialBoardEditComponent
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: EditorialBoardEditComponent
    }]),

    StoreModule.forFeature(editorialBoardStoreFeatureName, editorialBoardReducer),
    EffectsModule.forFeature([EditorialBoardEffects]),

    MatIconModule,
    MatProgressSpinnerModule,

    ModalModule.forRoot(),
    ListOfControlsModule,
    EditorialBoardMemberControlModule
	],
	declarations: declarations,
	exports: declarations
})
export class EditorialBoardEditModule {
}
