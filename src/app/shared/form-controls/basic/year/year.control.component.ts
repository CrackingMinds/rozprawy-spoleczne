import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { ControlComponent } from 'app/shared/form-controls/control-component/control.component';
import { CustomValidators } from 'app/shared/custom.validators';

@Component({
	selector: 'rs-year-control',
	templateUrl: `year.control.component.html`,
  styleUrls: ['./year.control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: YearControlComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: YearControlComponent,
      multi: true
    }
  ]
})
export class YearControlComponent extends ControlComponent<string> implements OnDestroy {

  readonly currentYear = new Date().getFullYear();

  get year(): AbstractControl {
    return this.formGroup.get('year');
  }

  constructor(formBuilder: FormBuilder) {
    super(formBuilder, {
      year: [
        null,
        [
          Validators.required,
          Validators.pattern(
            CustomValidators.fullMatch(CustomValidators.year)
          )
        ]
      ]
    });
  }

	ngOnDestroy() {
    super.destroy();
  }

  protected castFormValue(value: any): string {
    return this.castYear(value.year);
  }

  protected setControlValue(value: string): void {
    this.year.setValue(value);
  }

  private castYear(value: any): string {
    return value === '' ? null : value;
  }

}
