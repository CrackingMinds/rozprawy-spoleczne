import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable, ReplaySubject } from 'rxjs';

import { ModalContentComponent } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.content.component';

import { Issue, RawIssue } from 'app/models/issue';
import { CustomValidators } from 'app/shared/services/custom.validators';

@Component({
    selector: 'rs-create-issue',
    templateUrl: './issue.crud.modal.component.html'
})
export class IssueCRUDModalComponent implements ModalContentComponent, OnInit, OnDestroy {

  currentYear = new Date().getFullYear();

  params: Issue;

  form: FormGroup;

  private canSubmit$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    let initialIssue: RawIssue;

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

    let currentIssueCheckboxDisabled: boolean;

    if (this.params) {
      currentIssueCheckboxDisabled = this.params.isCurrent;
    } else {
      currentIssueCheckboxDisabled = false;
    }

    this.form = this.formBuilder.group(
      {
        year: [initialIssue.year, [
          Validators.required,
          Validators.pattern(
            CustomValidators.fullMatch(CustomValidators.issueYear)
          )
        ]],
        vol: [initialIssue.vol, [
          Validators.required,
          Validators.pattern(
            CustomValidators.fullMatch(CustomValidators.issueVolume)
          )
        ]],
        number: [initialIssue.number, [
          Validators.required,
          Validators.pattern(
            CustomValidators.fullMatch(CustomValidators.issueNumber)
          )
        ]],
        isCurrent: [{
          value: initialIssue.isCurrent,
          disabled: currentIssueCheckboxDisabled
        }]
      }
    );

    this.initFormValidityListener();
  }

  ngOnDestroy() {
    this.canSubmit$.complete();
  }

  cancel(): void {}

  submit(): Issue | RawIssue | null {
    if (!this.form.valid) {
      return null;
    }

    let newIssue: RawIssue = this.form.value;

    if (this.params) {
      return {
        ...this.params,
        ...newIssue
      };
    }

    return newIssue;
  }

  canSubmit(): Observable<boolean> {
    return this.canSubmit$.asObservable();
  }

  private initFormValidityListener(): void {
    this.canSubmit$.next(this.form.valid);

    this.form.statusChanges
        .subscribe((value: string) => {

          switch (value) {

            case 'INVALID': {
              this.canSubmit$.next(false);
              break;
            }

            case 'VALID': {
              this.canSubmit$.next(true);
              break;
            }
          }

        });
  }

}

