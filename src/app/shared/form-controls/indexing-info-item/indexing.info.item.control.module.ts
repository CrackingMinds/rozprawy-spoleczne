import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { IndexingInfoItemControlComponent } from 'app/shared/form-controls/indexing-info-item/indexing.info.item.control.component';

const declarations = [
  IndexingInfoItemControlComponent
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule
	],
	declarations: declarations,
	exports: declarations,
  entryComponents: [
    IndexingInfoItemControlComponent
  ]
})
export class IndexingInfoItemControlModule {
}
