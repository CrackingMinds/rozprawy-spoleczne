import { Component, OnInit, Input, Type, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ListOfControlsControl, ListOfControlsData } from 'app/shared/form-controls/list-of-controls/list.of.controls';

type ControlDataType = Array<ListOfControlsData>;

@Component({
	selector: 'rs-list-of-controls',
	templateUrl: `./list.of.controls.component.html`,
  styleUrls: ['./list.of.controls.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ListOfControlsComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ListOfControlsComponent,
      multi: true
    }
  ]
})
export class ListOfControlsComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {

  @Input()
  controlType: Type<ListOfControlsControl>;

  listOfControls: FormGroup = this.formBuilder.group({
    controls: this.formBuilder.array([])
  });

  controlsArrayName: string = 'controls';

  get controls(): FormArray {
    return this.listOfControls.get(this.controlsArrayName) as FormArray;
  }

  private onChangeCallback: (data: ControlDataType) => any;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef) {}

	ngOnInit() {
    this.listOfControls.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: ControlDataType) => {
        this.onChangeCallback && this.onChangeCallback(data);
      });

    this.addEmptyControl();
  }

	ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

	addEmptyControl(): void {
	  this.addControl({});
  }

  removeControl(index: number): void {
    this.controls.removeAt(index);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  validate(control: AbstractControl): ValidationErrors | null {

    if (this.listOfControls.invalid) {
      return {
        invalid: true
      };
    } else {
      return null;
    }

  }

  writeValue(data: ControlDataType): void {

    if (!data)
      return;

    this.controls.controls = [];
    data.forEach((item: ListOfControlsData) => {
      this.addControl(item);
    });

  }

  private addControl(controlData: ListOfControlsData): void {

    this.controls.push(
      this.formBuilder.control(controlData, [
        Validators.required
      ])
    );

    this.changeDetectorRef.detectChanges();

  }

}
