import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EditorialBoardMember, RawEditorialBoardMember } from 'app/models/editorial-board-member';

import { Person } from 'app/models/person';
import { CustomValidators } from 'app/shared/custom.validators';

import { ListOfControlsControl } from 'app/shared/form-controls/list-of-controls/list.of.controls';

@Component({
	selector: 'rs-editorial-board-member-control',
	templateUrl: `editorial.board.member.control.component.html`,
  styleUrls: ['./editorial.board.member.control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditorialBoardMemberControlComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: EditorialBoardMemberControlComponent,
      multi: true
    }
  ]
})
export class EditorialBoardMemberControlComponent implements ListOfControlsControl, ControlValueAccessor, Validator, OnInit, OnDestroy {

  @Input()
  memberData: EditorialBoardMember;

  boardMember: FormGroup;

  get position(): AbstractControl {
    return this.boardMember.get('position');
  }

  get person(): AbstractControl {
    return this.boardMember.get('person');
  }

  private onChangeCallback: (boardMember: EditorialBoardMember) => any;

  private unsubscribe$: Subject<void> = new Subject<void>();

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {

    let initialMemberData: RawEditorialBoardMember;

    if (this.memberData) {
      initialMemberData = {
        firstName: this.memberData.firstName,
        lastName: this.memberData.lastName,
        middleName: this.memberData.middleName,
        position: this.memberData.position
      };
    } else {
      initialMemberData = {
        firstName: undefined,
        lastName: undefined,
        middleName: undefined,
        position: undefined
      };
    }

    const initialPersonData: Person = {
      firstName: initialMemberData.firstName,
      lastName: initialMemberData.lastName,
      middleName: initialMemberData.middleName
    };

    this.boardMember = this.formBuilder.group({
      person: [
        initialPersonData,
        [
          Validators.required
        ]
      ],
      position: [
        initialMemberData.position,
        [
          Validators.required,
          Validators.pattern(
            CustomValidators.fullMatch(CustomValidators.editorialBoardMemberPosition)
          )
        ]
      ]
    });

    this.boardMember.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((boardMember: EditorialBoardMember) => {
        this.onChangeCallback && this.onChangeCallback(boardMember);
      });

	}

	ngOnDestroy() {
	  this.unsubscribe$.next();
	  this.unsubscribe$.complete();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  writeValue(boardMember: EditorialBoardMember): void {

	  if (!boardMember)
	    return;

	  this.position.setValue(boardMember.position);
	  const person: Person = {
	    firstName: boardMember.firstName,
      lastName: boardMember.lastName,
      middleName: boardMember.middleName
    };
	  this.person.setValue(person);

  }

  validate(control: AbstractControl): ValidationErrors | null {

    if (this.boardMember.invalid) {
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
