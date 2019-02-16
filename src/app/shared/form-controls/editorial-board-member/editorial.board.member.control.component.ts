import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EditorialBoardMember, EditorialBoardMemberPosition, RawEditorialBoardMember } from 'app/models/editorial-board-member';

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

    let initialMemberData: RawEditorialBoardMember = {
      person: {
        firstName: null,
        lastName: null,
        middleName: null
      },
      position: null,
      index: null
    };

    this.boardMember = this.formBuilder.group({
      person: [
        initialMemberData.person,
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
        this.reportValueChange(boardMember);
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

	  this.setControlValue(boardMember);

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

  private setControlValue(data: EditorialBoardMember): void {
    this.person.setValue(data.person);
    this.position.setValue(data.position);
  }

  private reportValueChange(member: EditorialBoardMember): void {
	  const newValue = this.processValue(member);
    this.onChangeCallback && this.onChangeCallback(newValue);
  }

  private processValue(member: EditorialBoardMember): EditorialBoardMember {
	  return {
      ...member,
	    person: this.processPerson(member.person),
      position: this.processPosition(member.position)
    };
  }

  private processPerson(person: Person): Person {
	  return {
	    firstName: person.firstName === "" ? null : person.firstName,
      lastName: person.lastName === "" ? null : person.lastName,
      middleName: person.middleName === "" ? null : person.middleName
    };
  }

  private processPosition(position: EditorialBoardMemberPosition): EditorialBoardMemberPosition {
	  return position === "" ? null : position;
  }

}
