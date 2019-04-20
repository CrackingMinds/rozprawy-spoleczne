import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NewReviewerYear, RawReviewerYear, ReviewerYearType } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';
import { ModalContentComponent } from 'app/admin/pages/library/modal/content/modal.content.component';

@Component({
	selector: 'rs-create-year-dialog',
	templateUrl: `reviewer.year.dialog.component.html`,
  styleUrls: ['./reviewer.year.dialog.component.scss']
})
export class ReviewerYearDialogComponent extends ModalContentComponent<ReviewerYearType, NewReviewerYear> implements OnInit, OnDestroy {

  get year(): AbstractControl {
    return this.form.get('year');
  }

  form: FormGroup;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder) { super(); }

	ngOnInit() {
    this.initForm();
    this.initFormValidityListener();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit(): NewReviewerYear {
    if (!this.form.valid) {
      return null;
    }

    return this.year.value;
  }

  private initForm(): void {
    const initialData: RawReviewerYear = {
      value: null
    };

    if (this.params) {
      initialData.value = this.params.value;
    }

    this.form = this.formBuilder.group({
      year: [
        initialData.value,
        [
          Validators.required
        ]
      ]
    });
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
