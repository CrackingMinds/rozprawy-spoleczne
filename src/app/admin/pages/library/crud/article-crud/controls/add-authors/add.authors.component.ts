import { Component, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR, FormArray, AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Author } from 'app/models/author';
import { CustomValidators } from 'app/shared/services/custom.validators';

@Component({
  selector: 'rs-add-authors',
  templateUrl: './add.authors.component.html',
  styleUrls: ['./add.authors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddAuthorsComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AddAuthorsComponent,
      multi: true
    }
  ]
})
export class AddAuthorsComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {

  form: FormGroup = this.formBuilder.group({
    authors: this.formBuilder.array([])
  });

  get authors(): AbstractControl[] {
    return this.getAuthorsArrayControl().controls;
  }

  private onChangeCallback: (authors: Author[]) => any;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.form.valueChanges
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((value: any) => {
          this.reportChanges(value.authors);
        });

    this.addEmptyAuthor();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addEmptyAuthor(): void {

    const authorData: Author = {
      firstName: undefined,
      lastName: undefined,
      middleName: undefined
    };

    this.addAuthorField(authorData);

  }

  addAuthor(authorData: Author): void {
    this.addAuthorField(authorData);
  }

  removeAuthor(index: number): void {
    this.getAuthorsArrayControl().removeAt(index);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(authors: Author[]): void {

    if (!authors)
      return;

    this.getAuthorsArrayControl().controls = [];
    authors.forEach((author: Author) => {
      this.addAuthor(author);
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.form.invalid) {
      return {
        invalid: true
      };
    } else {
      return null;
    }
  }

  private addAuthorField(author: Author): void {
    this.getAuthorsArrayControl().push(
      this.formBuilder.group({
        firstName: [
          author.firstName,
          [
            Validators.required,
            Validators.pattern(
              CustomValidators.fullMatch(CustomValidators.personName)
            )
          ]
        ],
        lastName: [
          author.lastName,
          [
            Validators.required,
            Validators.pattern(
              CustomValidators.fullMatch(CustomValidators.personName)
            )
          ]
        ],
        middleName: [
          author.middleName,
          [
            Validators.pattern(
              CustomValidators.fullMatch(CustomValidators.personName)
            )
          ]
        ]
      })
    );

  }

  private getAuthorsArrayControl(): FormArray {
    return this.form.controls['authors'] as FormArray;
  }

  private reportChanges(authors: Author[]): void {
    if (this.onChangeCallback) {
      this.onChangeCallback(authors);
    }
  }

}
