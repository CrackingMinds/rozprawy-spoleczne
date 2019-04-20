import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ModalContentComponent } from 'app/admin/pages/library/modal/content/modal.content.component';

import { Issue, RawIssue } from 'app/models/issue';
import { CustomValidators } from 'app/shared/custom.validators';

@Component({
    selector: 'rs-create-issue',
    templateUrl: './issue.crud.component.html'
})
export class IssueCrudComponent extends ModalContentComponent<Issue, Issue | RawIssue | null> implements OnInit, OnDestroy {

  form: FormGroup;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder) { super(); }

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
          Validators.required
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
    this.destroy$.next();
    this.destroy$.complete();
  }

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

  private initFormValidityListener(): void {

    if (this.form.valid) {
      this.enableSubmit();
    } else {
      this.disableSubmit();
    }

    this.form.statusChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((formStatus: string) => {

          switch (formStatus) {

            case 'INVALID': {
              this.disableSubmit();
              break;
            }

            case 'VALID': {
              this.enableSubmit();
              break;
            }
          }

        });
  }

}

