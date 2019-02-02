import { Component, OnInit, Input, Type } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { ListOfControlsControl, ListOfControlsData } from 'app/shared/form-controls/list-of-controls/list.of.controls';

@Component({
	selector: 'rs-list-of-controls',
	templateUrl: `list.of.controls.component.html`
})
export class ListOfControlsComponent implements OnInit {

  @Input('control')
  controlType: Type<ListOfControlsControl>;

  @Input()
  initialData: Array<ListOfControlsData>;

  listOfControls: FormGroup = this.formBuilder.group({
    controls: this.formBuilder.array([])
  });

  controlsArrayName: string = 'controls';

  get controls(): FormArray {
    return this.listOfControls.get(this.controlsArrayName) as FormArray;
  }

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {

	  if (this.initialData) {

	    this.initialData.forEach((data: ListOfControlsData) => {
	      this.addControl(data);
      });

    } else {
	    this.addEmptyControl();
    }

	}

	addEmptyControl(): void {
	  this.addControl({});
  }

  removeControl(index: number): void {
    this.controls.removeAt(index);
  }

  private addControl(controlData: ListOfControlsData): void {

    this.controls.push(
      this.formBuilder.control(controlData, [
        Validators.required
      ])
    );

  }

}
