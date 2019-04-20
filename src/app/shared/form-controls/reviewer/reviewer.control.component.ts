import { Component, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { ControlComponent } from 'app/shared/form-controls/control-component/control.component';

import { ReviewerControlData } from 'app/models/reviewer';
import { Cast } from 'app/shared/cast';

@Component({
	selector: 'rs-reviewer-control',
	templateUrl: `reviewer.control.component.html`,
	styleUrls: ['./reviewer.control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ReviewerControlComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ReviewerControlComponent,
      multi: true
    }
  ]
})
export class ReviewerControlComponent extends ControlComponent<ReviewerControlData> implements OnDestroy {

  get person(): AbstractControl {
    return this.formGroup.get('person');
  }

  get title(): AbstractControl {
    return this.formGroup.get('title');
  }

  get additionalInfo(): AbstractControl {
    return this.formGroup.get('additionalInfo');
  }

	constructor(formBuilder: FormBuilder) {
    super(formBuilder, {
      person: [
        null,
        [
          Validators.required
        ]
      ],
      title: [
        null,
        [
          Validators.required
        ]
      ],
      additionalInfo: [
        null
      ]
    });
  }

	ngOnDestroy() {
    super.destroy();
  }

  protected castFormValue(value: any): ReviewerControlData {
    return {
      person: Cast.toPerson(value.person),
      title: this.castTitle(value.title),
      additionalInfo: this.castAdditionalInfo(value.additionalInfo)
    };
  }

  protected setControlValue(value: ReviewerControlData): void {

    value = this.castFormValue(value);

    this.person.setValue(value.person);
    this.title.setValue(value.title);
    this.additionalInfo.setValue(value.additionalInfo);
  }

  private castTitle(title: string): string {
    return title === "" ? null : title;
  }

  private castAdditionalInfo(additionalInfo: string): string {
    return additionalInfo === "" ? null : additionalInfo;
  }

}
