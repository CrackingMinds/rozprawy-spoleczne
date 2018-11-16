import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ModalContentComponent } from 'app/admin/library/list-of-issues/modals/modal/modal.content.component';

import { IIssue, IRawIssue } from 'app/models/issue';

@Component({
    selector: 'rs-create-issue',
    templateUrl: './issue.crud.modal.component.html'
})
export class IssueCRUDModalComponent implements ModalContentComponent, OnInit {

  currentYear = new Date().getFullYear();

  params: IIssue;

  form: FormGroup;

  get canSubmit(): boolean {
    if (!this.form) {
      return false;
    }
    return this.form.valid;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    let initialIssue: IRawIssue;

    if (this.params) {
      initialIssue = {
        year: this.params.year,
        vol: this.params.vol,
        number: this.params.number,
        isCurrent: this.params.isCurrent
      };
    } else {
      initialIssue = {
        year: undefined,
        vol: undefined,
        number: undefined,
        isCurrent: false
      };
    }

    this.form = this.formBuilder.group(
      {
        year: [initialIssue.year, [
          Validators.required,
          Validators.pattern(/^[1-9][\d]{3}$/)
        ]],
        vol: [initialIssue.vol, [
          Validators.required,
          Validators.pattern(/^[1-9]{1,2}$/)
        ]],
        number: [initialIssue.number, [
          Validators.required,
          Validators.pattern(/^[1-9]{1,2}$/)
        ]],
        isCurrent: [initialIssue.isCurrent]
      }
    );
  }

  cancel(): void {}

  submit(): IIssue | IRawIssue | null {
    if (!this.form.valid) {
      return null;
    }

    let newIssue: IRawIssue = this.form.value;

    if (this.params) {
      return {
        ...this.params,
        ...newIssue
      };
    }

    return newIssue;
  }

}

