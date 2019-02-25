import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { Cast } from 'app/shared/cast';

import { EditorialBoardMemberPosition, RawEditorialBoardMember } from 'app/models/editorial-board-member';

import { CustomValidators } from 'app/shared/custom.validators';

import { ControlComponent } from 'app/shared/form-controls/control-component/control.component';

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
export class EditorialBoardMemberControlComponent extends ControlComponent<RawEditorialBoardMember> implements OnInit, OnDestroy {

  get position(): AbstractControl {
    return this.formGroup.get('position');
  }

  get person(): AbstractControl {
    return this.formGroup.get('person');
  }

	constructor(private formBuilder: FormBuilder) { super(formBuilder); }

	ngOnInit() {

    let initialMemberData: RawEditorialBoardMember = {
      person: {
        firstName: null,
        lastName: null,
        middleName: null
      },
      position: null
    };

    const controlsConfig = {
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
    };

    super.init(controlsConfig);

	}

	ngOnDestroy() {
	  super.destroy();
  }

  protected setControlValue(data: any): void {

    data = this.castFormValue(data);

    this.person.setValue(data.person);
    this.position.setValue(data.position);
  }

  protected castFormValue(member: any): RawEditorialBoardMember {
	  return {
      ...member,
	    person: Cast.toPerson(member.person),
      position: this.castPosition(member.position)
    };
  }

  private castPosition(position: EditorialBoardMemberPosition): EditorialBoardMemberPosition {
	  return position === "" ? null : position;
  }

}
