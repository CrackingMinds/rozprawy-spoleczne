import { FormGroup, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ListOfControlsControl } from 'app/shared/form-controls/list-of-controls/list.of.controls';

export type ControlsConfig = {
  [key: string]: any;
};

export abstract class ControlComponent<T> implements ListOfControlsControl {

  formGroup: FormGroup;

  private onChangeCallback: (value: T) => any;

  protected readonly destroy$: Subject<void> = new Subject<void>();

  protected constructor(private formBuilderInstance: FormBuilder) {}

  init(controlsConfig: ControlsConfig): void {

    this.formGroup = this.formBuilderInstance.group(controlsConfig);

    this.formGroup.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((value: any) => this.reportValueChanges(value));

  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {}

  registerOnValidatorChange(fn: () => void): void {}

  setDisabledState(isDisabled: boolean): void {}

  validate(control: AbstractControl): ValidationErrors | null {

    if (this.formGroup.invalid) {
      return {
        invalid: true
      };
    } else {
      return null;
    }

  }

  writeValue(value: any): void {

    if (!value)
      return;

    this.setControlValue(value);

  }

  private reportValueChanges(value: any): void {
    this.onChangeCallback && this.onChangeCallback(this.castFormValue(value));
  }

  protected abstract setControlValue(value: T): void;

  protected abstract castFormValue(value: any): T;

}
