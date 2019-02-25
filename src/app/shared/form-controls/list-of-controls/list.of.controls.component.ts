import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Type, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  ListOfControlsControl,
  ListOfControlsValueCreate,
  ListOfControlsValueRemove,
  ListOfControlsValueUpdate
} from 'app/shared/form-controls/list-of-controls/list.of.controls';
import { Utils } from 'app/shared/utils';
import { ModalData } from 'app/admin/pages/library/modal/modal.data';
import { ModalService } from 'app/admin/pages/library/modal/modal.service';
import { Sortable } from 'app/models/sortable';

type ControlValue = any;

type ListValue = Array<ControlValue>;

type SortingOrderChange = {
  controlIndex: number;
  newIndex: number;
};

enum ChangeOrderDirection {
  UP,
  BOTTOM
}

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

  @Input()
  confirmDelete: boolean = true;

  @Output('valueUpdate')
  controlValueUpdate$: EventEmitter<ListOfControlsValueUpdate<any>> = new EventEmitter<ListOfControlsValueUpdate<any>>();

  @Output('valueCreate')
  controlValueCreate$: EventEmitter<ListOfControlsValueCreate<any>> = new EventEmitter<ListOfControlsValueCreate<any>>();

  @Output('valueRemove')
  controlValueRemove$: EventEmitter<ListOfControlsValueRemove> = new EventEmitter<ListOfControlsValueRemove>();

  listOfControls: FormGroup = this.formBuilder.group({
    controls: this.formBuilder.array([])
  });

  controlsArrayName: string = 'controls';

  get controls(): FormArray {
    return this.listOfControls.get(this.controlsArrayName) as FormArray;
  }

  private modifiedControls: Array<boolean> = [];

  private initialControlValues: { [index: number]: ControlValue } = [];

  private onChangeCallback: (data: ListValue) => any;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              private modal: ModalService) {}

	ngOnInit() {

    this.listOfControls.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: ListValue) => {
        this.onChangeCallback && this.onChangeCallback(data);
      });

  }

	ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

	add(): void {

    this.createControl(undefined);
    const controlIndex = this.controls.controls.length - 1;
    this.setModifiedStateOfControl(controlIndex, true);

  }

  remove(index: number): void {

    const isNewlyCreated: boolean = !this.getInitialValueOfControl(index);

    if (!isNewlyCreated && this.confirmDelete) {

      const modalData: ModalData = {
        title: undefined,
        content: 'Czy napewno chcesz usunąć tą osobę?',
        buttons: {
          submit: {
            text: 'Tak'
          }
        },
        otherParams: undefined
      };

      const dialogRef = this.modal.open(modalData);
      dialogRef.afterClosed()
        .pipe(
          takeUntil(this.unsubscribe$)
        )
        .subscribe((actionSubmitted: boolean) => {

          if (!actionSubmitted) {
            return;
          }

          this.controlValueRemove$.emit({
            controlIndex: index
          });

          this.removeControl(index);

        })

    } else {
      this.removeControl(index);
    }

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

  writeValue(data: ListValue): void {

    if (!data)
      return;

    this.createControlsForData(data);

  }

  checkInvalid(controlIndex: number): boolean {
    return this.getControlByIndex(controlIndex).invalid;
  }

  checkValid(controlIndex: number): boolean {
    return this.getControlByIndex(controlIndex).valid;
  }

  checkModified(controlIndex: number): boolean {
    return this.modifiedControls[controlIndex];
  }

  submitControlValue(controlIndex: number): void {

    const initialValue = this.getInitialValueOfControl(controlIndex);
    const controlValue = this.getControlValue(controlIndex);

    if (!initialValue) {
      this.controlValueCreate$.emit({
        controlIndex: controlIndex,
        controlValue: controlValue
      });

      return;
    }

    this.controlValueUpdate$.emit({
      controlIndex: controlIndex,
      controlValue: controlValue
    });
  }

  cancelControlValue(controlIndex: number): void {
    const initialValue = this.getInitialValueOfControl(controlIndex);

    if (initialValue) {
      this.setControlValue(controlIndex, initialValue);
    } else {
      this.remove(controlIndex);
    }

  }

  moveUp(controlIndex: number): void {
    this.changeControlIndex(controlIndex, ChangeOrderDirection.UP);
  }

  moveDown(controlIndex: number): void {
    this.changeControlIndex(controlIndex, ChangeOrderDirection.BOTTOM);
  }

  checkMoveUpDisabled(controlIndex: number): boolean {
    return this.checkReorderDisabled() || controlIndex === 0;
  }

  checkMoveDownDisabled(controlIndex: number): boolean {
    return this.checkReorderDisabled() || controlIndex === this.controls.controls.length - 1;
  }

  private checkReorderDisabled(): boolean {
    return !!this.modifiedControls.filter((modified) => modified).length;
  }

  private removeControl(index: number): void {
    this.controls.removeAt(index);
    this.modifiedControls.splice(index, 1);
  }

  private changeControlIndex(controlIndex: number, direction: ChangeOrderDirection): void {

    let nextIndex: number;

    switch (direction) {

      case ChangeOrderDirection.UP: {
        nextIndex = controlIndex - 1;
        break;
      }

      case ChangeOrderDirection.BOTTOM: {
        nextIndex = controlIndex + 1;
        break;
      }

    }

    this.reportIndexUpdate({
      controlIndex: controlIndex,
      newIndex: nextIndex
    });

    this.reportIndexUpdate({
      controlIndex: nextIndex,
      newIndex: controlIndex
    });

  }

  private reportIndexUpdate(data: SortingOrderChange): void {

    const controlValue = this.getControlValue(data.controlIndex);
    const newControlValue: Sortable = {
      ...controlValue,
      index: data.newIndex
    };

    this.controlValueUpdate$.emit({
      controlIndex: data.controlIndex,
      controlValue: newControlValue
    });

  }

  private createControlsForData(data: ListValue): void {
    this.controls.controls = [];
    this.initialControlValues = [];
    this.modifiedControls = [];

    data.forEach((value: ControlValue) => {

      const control = this.createControl(value);
      const controlIndex = this.controls.controls.length - 1;

      this.saveInitialValueOfControl(controlIndex, control.value);

      this.setModifiedStateOfControl(controlIndex, false);

      this.registerControlValueChangeHandler(controlIndex, control);

    });

  }

  private saveInitialValueOfControl(controlIndex: number, value: ControlValue): void {
    this.initialControlValues[controlIndex] = value;
  }

  private getInitialValueOfControl(controlIndex: number): any {
    return this.initialControlValues[controlIndex];
  }

  private setControlValue(controlIndex: number, value: ControlValue): void {
    this.getControlByIndex(controlIndex).setValue(value);
  }

  private getControlValue(controlIndex: number): any {
    return this.getControlByIndex(controlIndex).value;
  }

  private getControlByIndex(controlIndex: number): AbstractControl {
    return this.controls.controls[controlIndex];
  }

  private setModifiedStateOfControl(controlIndex: number, modified: boolean): void {
    this.modifiedControls[controlIndex] = modified;
  }

  private registerControlValueChangeHandler(controlIndex: number, control: AbstractControl): void {
    control.valueChanges.subscribe((newValue) => {
      const modified = this.checkControlValueModified(controlIndex, newValue);
      this.setModifiedStateOfControl(controlIndex, modified);
    });
  }

  private checkControlValueModified(controlIndex: number, newValue: ControlValue): boolean {
    const initialValue = this.getInitialValueOfControl(controlIndex);
    return !Utils.areObjectsEqual(initialValue, newValue);
  }

  private createControl(controlValue: ControlValue): AbstractControl {

    const newControl = this.formBuilder.control(controlValue, [
      Validators.required
    ]);

    this.controls.push(
      newControl
    );

    this.changeDetectorRef.detectChanges();

    return newControl;

  }

}
