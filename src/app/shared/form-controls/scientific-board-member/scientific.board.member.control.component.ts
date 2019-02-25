import { Component, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { Cast } from 'app/shared/cast';

import { RawScientificBoardMember, ScientificBoardMemberInstitute } from 'app/models/scientific-board-member';

import { CustomValidators } from 'app/shared/custom.validators';
import { ControlComponent, ControlsConfig } from 'app/shared/form-controls/control-component/control.component';

@Component({
	selector: 'rs-scientific-board-member-control',
	templateUrl: `scientific.board.member.control.component.html`,
  styleUrls: ['./scientific.board.member.control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ScientificBoardMemberControlComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ScientificBoardMemberControlComponent,
      multi: true
    }
  ]
})
export class ScientificBoardMemberControlComponent extends ControlComponent<RawScientificBoardMember> implements OnInit, OnDestroy {

  get person(): AbstractControl {
    return this.formGroup.get('person');
  }

  get institute(): AbstractControl {
    return this.formGroup.get('institute');
  }

  get instituteName(): AbstractControl {
    return this.institute.get('name');
  }

  get instituteLocation(): AbstractControl {
    return this.institute.get('location');
  }

  constructor(private formBuilder: FormBuilder) { super(formBuilder); }

	ngOnInit() {

    const initialMemberData: RawScientificBoardMember = {
      person: {
        firstName: null,
        lastName: null,
        middleName: null
      },
      institute: {
        name: null,
        location: null
      }
    };

    const controlsConfig: ControlsConfig = {
      person: [
        initialMemberData.person,
        [
          Validators.required
        ]
      ],
      institute: this.formBuilder.group({
        name: [
          initialMemberData.institute.name,
          [
            Validators.required,
            Validators.pattern(
              CustomValidators.fullMatch(CustomValidators.scientificBoardMemberInstituteName)
            )
          ]
        ],
        location: [
          initialMemberData.institute.location,
          [
            Validators.required,
            Validators.pattern(
              CustomValidators.fullMatch(CustomValidators.scientificBoardMemberInstituteLocation)
            )
          ]
        ]
      })
    };

    super.init(controlsConfig);

	}

  ngOnDestroy() {
    super.destroy();
  }

  protected setControlValue(data: any): void {

    data = this.castFormValue(data);

    this.person.setValue(data.person);
    this.institute.setValue(data.institute);
  }

  protected castFormValue(value: any): RawScientificBoardMember {
    return {
      institute: this.castInstitute(value.institute),
      person: Cast.toPerson(value.person)
    };
  }

  private castInstitute(value: any): ScientificBoardMemberInstitute {
    return {
      name: value.name === "" ? null : value.name,
      location: value.location === "" ? null : value.location
    }
  }

}
