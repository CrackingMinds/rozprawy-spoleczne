import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { ModalContentComponent } from 'app/admin/library/list-of-issues/modals/modal/modal.content.component';
import { IssueService } from 'app/pages/issue/issue.service';
import { ModalParams } from 'app/admin/library/list-of-issues/modals/modal/modal.params';

@Component({
    selector: 'rs-create-issue',
    templateUrl: './create-issue.component.html'
})
export class CreateIssueComponent implements ModalContentComponent, OnInit {

  currentYear = new Date().getFullYear();

  form = this.formBuilder.group(
    {
      year: [undefined, [
        Validators.required,
        Validators.pattern(/^[1-9][\d]{3}$/)
      ]],
      vol: [undefined, [
        Validators.required,
        Validators.pattern(/^[1-9]{1,2}$/)
      ]],
      number: [undefined, [
        Validators.required,
        Validators.pattern(/^[1-9]{1,2}$/)
      ]],
      isCurrent: [undefined]
    }
  );

  params: ModalParams;

  get canSubmit(): boolean {
    return this.form.valid;
  }

  constructor(private issueService: IssueService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

  }

  cancel(): Promise<void> {
    return new Promise<void>(resolve => resolve());
  }

  submit(): Promise<void> {
    if (!this.form.valid) {
      return null;
    }

    return this.issueService.postIssue(this.form.value);
  }

}

