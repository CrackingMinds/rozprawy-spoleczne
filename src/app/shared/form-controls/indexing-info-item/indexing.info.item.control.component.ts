import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators, AbstractControl } from '@angular/forms';

import { ControlComponent } from 'app/shared/form-controls/control-component/control.component';
import { RawIndexingInfoItem } from 'app/models/indexing';

@Component({
	selector: 'rs-indexing-info-item-control',
	templateUrl: `indexing.info.item.control.component.html`,
  styleUrls: ['./indexing.info.item.control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IndexingInfoItemControlComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: IndexingInfoItemControlComponent,
      multi: true
    }
  ]
})
export class IndexingInfoItemControlComponent extends ControlComponent<RawIndexingInfoItem> implements OnDestroy {

  get name(): AbstractControl {
    return this.formGroup.get('name');
  }

  get value(): AbstractControl {
    return this.formGroup.get('value');
  }

	constructor(formBuilder: FormBuilder) {
    super(formBuilder, {
      name: [
        null,
        [
          Validators.required
        ]
      ],
      value: [
        null
      ]
    });
	}

  ngOnDestroy() {
	  super.destroy();
  }

  protected castFormValue(value: any): RawIndexingInfoItem {
    return {
      name: IndexingInfoItemControlComponent.castName(value.name),
      value: IndexingInfoItemControlComponent.castValue(value.value)
    };
  }

  protected setControlValue(value: any): void {
	  value = this.castFormValue(value);
    this.name.setValue(value.name);
    this.value.setValue(value.value);
  }

  private static castName(value: string): string {
    return value === "" ? null : value;
  }

  private static castValue(value: string): string {
    return value === "" ? null : value;
  }

}
