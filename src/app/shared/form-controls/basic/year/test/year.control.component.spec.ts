import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { YearControlModule } from 'app/shared/form-controls/basic/year/year.control.module';
import { YearControlComponent } from 'app/shared/form-controls/basic/year/year.control.component';

describe('YearControlComponent', () => {

  let fixture: ComponentFixture<TestYearControlComponent>;

  @Component({
    selector: 'rs-test-year-control',
    template: `
      <ng-container [formGroup]="form">
        <rs-year-control formControlName="year"></rs-year-control>
      </ng-container>
		`
  })
  class TestYearControlComponent {

    @ViewChild(YearControlComponent, { read: ElementRef })
    yearControlElemRef: ElementRef;

    get year(): AbstractControl {
      return this.form.get('year');
    }

    readonly form: FormGroup = this.formBuilder.group({
      year: [
        null
      ]
    });

    constructor(private formBuilder: FormBuilder) {}

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,

        YearControlModule
      ],
      declarations: [
        TestYearControlComponent
      ]
    });

    fixture = TestBed.createComponent(TestYearControlComponent);
    fixture.detectChanges();
  });

  it('should return entered value', () => {

    // given
    const expectedValue = new Date().getFullYear().toString();

    // when
    enterValue(expectedValue);

    // then
    const actualValue = getControlValue();
    expect(actualValue).toBe(expectedValue);

    function enterValue(value: string): void {
      const yearInput = selectYearInput();
      changeInputValue(yearInput, value);
    }

  });

  it('should display provided value', () => {

    // given
    const expectedValue = new Date().getFullYear().toString();

    // when
    provideControlValue(expectedValue);

    // then
    const actualValue = getDisplayedValue();
    expect(actualValue).toBe(expectedValue);

    function provideControlValue(value: string): void {
      fixture.componentInstance.year.setValue(value);
      fixture.detectChanges();
    }

    function getDisplayedValue(): string {
      const yearInput = selectYearInput();
      return yearInput.value;
    }

  });

  it('should be invalid on incorrect input', () => {

    // when
    enterIncorrectValue();

    // then
    expectControlToBeInvalid();

    function enterIncorrectValue(): void {
      const incorrectValue = 'testtesttest';
      const yearInput = selectYearInput();
      changeInputValue(yearInput, incorrectValue);
    }

  });

  it('should be invalid when empty', () => {

    // when
    enterEmptyValue();

    // then
    expectControlToBeInvalid();

    function enterEmptyValue(): void {
      const yearInput = selectYearInput();
      changeInputValue(yearInput, '');
    }

  });

  it('should be valid on correct input', () => {

    // when
    enterCorrectValue();

    // then
    expectControlToBeValid();

    function enterCorrectValue(): void {
      const correctValue = new Date().getFullYear().toString();
      const yearInput = selectYearInput();
      changeInputValue(yearInput, correctValue);
    }

  });

  function selectYearInput(): HTMLInputElement {
    return fixture.componentInstance.yearControlElemRef.nativeElement.querySelector('input');
  }

  function changeInputValue(input: HTMLInputElement, value: any): void {
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function getControl(): AbstractControl {
    return fixture.componentInstance.year;
  }

  function getControlValue(): string {
    return getControl().value;
  }

  function expectControlToBeValid() {
    const isControlValid = getControl().valid;
    expect(isControlValid).toBe(true);
  }

  function expectControlToBeInvalid() {
    const isControlValid = getControl().valid;
    expect(isControlValid).toBe(false);
  }

});
