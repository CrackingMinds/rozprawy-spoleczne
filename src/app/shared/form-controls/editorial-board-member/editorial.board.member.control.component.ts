import { Component, OnDestroy } from '@angular/core';
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
export class EditorialBoardMemberControlComponent extends ControlComponent<RawEditorialBoardMember> implements OnDestroy {

  get position(): AbstractControl {
    return this.formGroup.get('position');
  }

  get person(): AbstractControl {
    return this.formGroup.get('person');
  }

	constructor(formBuilder: FormBuilder) {

    super(formBuilder, {
      person: [
        null,
        [
          Validators.required
        ]
      ],
      position: [
        null,
        [
          Validators.required,
          Validators.pattern(
            CustomValidators.fullMatch(CustomValidators.editorialBoardMemberPosition)
          )
        ]
      ]
    });
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
