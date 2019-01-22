import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
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

import { Person } from 'app/models/person';
import { CustomValidators } from 'app/shared/custom.validators';

@Component({
	selector: 'rs-person-control',
	templateUrl: `person.control.component.html`,
  styleUrls: ['./person.control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PersonControlComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PersonControlComponent,
      multi: true
    }
  ]
})
export class PersonControlComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {

  @Input()
  personData: Person;

  person: FormGroup;

  get firstName(): AbstractControl {
    return this.person.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.person.get('lastName');
  }

  get middleName(): AbstractControl {
    return this.person.get('middleName');
  }

  private onChangeCallback: (person: Person) => any;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {
  }

	ngOnInit() {

    let initialPersonData: Person;

    if (this.personData) {
      initialPersonData = this.personData;
    } else {
      initialPersonData = {
        firstName: undefined,
        lastName: undefined,
        middleName: undefined
      };
    }

    this.person = this.formBuilder.group({
      firstName: [
        initialPersonData.firstName,
        [
          Validators.required,
          Validators.pattern(
            CustomValidators.fullMatch(CustomValidators.personName)
          )
        ]
      ],
      lastName: [
        initialPersonData.lastName,
        [
          Validators.required,
          Validators.pattern(
            CustomValidators.fullMatch(CustomValidators.personSurname)
          )
        ]
      ],
      middleName: [
        initialPersonData.middleName,
        [
          Validators.pattern(
            CustomValidators.fullMatch(CustomValidators.personName)
          )
        ]
      ]
    });

    this.person.valueChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((person: Person) => {
          this.onChangeCallback && this.onChangeCallback(person);
        });

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  writeValue(person: Person): void {

    if (!person)
      return;

    this.firstName.setValue(person.firstName);
    this.lastName.setValue(person.lastName);
    this.middleName.setValue(person.middleName);

  }

  validate(control: AbstractControl): ValidationErrors | null {

    if (this.person.invalid) {
      return {
        invalid: true
      };
    } else {
      return null;
    }

  }

  registerOnTouched(fn: any): void {
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

}
