import { Component, OnInit, Type, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  ListOfControlsControl,
  ListOfControlsValueCreate,
  ListOfControlsValueRemove,
  ListOfControlsValueUpdate
} from 'app/shared/form-controls/list-of-controls/list.of.controls';
import { ReviewerControlComponent } from 'app/shared/form-controls/reviewer/reviewer.control.component';

import { Reviewer, ReviewerControlData, Reviewers } from 'app/models/reviewer';
import { ReviewerCreateEvent, ReviewerEvent, ReviewerRemoveEvent, ReviewerUpdateEvent } from 'app/admin/pages/reviewers/list-of-reviewers/reviewer.event';
import { ReviewerYearEvent, ReviewerYearRemoveEvent } from 'app/admin/pages/reviewers/list-of-years/reviewer.year.events';
import { CustomSorting } from 'app/shared/custom.sorting';
import { ModalService } from 'app/admin/pages/library/modal/modal.service';
import { ModalData } from 'app/admin/pages/library/modal/modal.data';

@Component({
	selector: 'rs-list-of-reviewers',
	templateUrl: `list.of.reviewers.component.html`,
  styleUrls: ['./list.of.reviewers.component.scss']
})
export class ListOfReviewersComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  yearId: string;

  @Input()
  set reviewers(value: Reviewers) {

    let reviewers: Reviewers;

    if (value && value.length) {
      reviewers = [...value].sort(CustomSorting.byCustomOrder);
    } else {
      reviewers = [];
    }

    this.reviewersList = reviewers;
    this.setFormValue(reviewers);
  }

  @Output()
  reviewerEvent: EventEmitter<ReviewerEvent> = new EventEmitter();

  @Output()
  yearEvent: EventEmitter<ReviewerYearEvent> = new EventEmitter();

  readonly control: Type<ListOfControlsControl> = ReviewerControlComponent;

  readonly form: FormGroup = this.formBuilder.group({
    reviewersArray: [
      null,
      Validators.required
    ]
  });

  get reviewersArray(): FormArray {
    return this.form.get('reviewersArray') as FormArray;
  }

  private reviewersList: Reviewers;

  private readonly destroy$: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder,
              private modal: ModalService) {}

	ngOnInit() {

	}

	ngOnChanges(changes: SimpleChanges) {

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onReviewerUpdate(event: ListOfControlsValueUpdate<ReviewerControlData>): void {
    const oldReviewerData = this.getReviewerByIndex(event.controlIndex);
    const newReviewerData = event.controlValue;

    this.reviewerEvent.emit(new ReviewerUpdateEvent({
      ...oldReviewerData,
      ...newReviewerData
    }));
  }

  onReviewerCreate(event: ListOfControlsValueCreate<ReviewerControlData>): void {
    this.reviewerEvent.emit(new ReviewerCreateEvent({
      ...event.controlValue,
      index: event.controlIndex,
      yearId: this.yearId
    }));
  }

  onReviewerRemove(event: ListOfControlsValueRemove): void {
    this.reviewerEvent.emit(new ReviewerRemoveEvent({
      reviewerId: this.getReviewerByIndex(event.controlIndex).id
    }));
  }

  removeYear(): void {
    const modalData: ModalData<void> = {
      title: undefined,
      content: 'Czy napewno chcesz usunąć ten rok',
      buttons: {
        submit: {
          text: 'Tak'
        }
      },
      otherParams: undefined
    };

    const dialogRef = this.modal.open(modalData);
    dialogRef.afterClosed()
             .pipe(takeUntil(this.destroy$))
             .subscribe((actionSubmitted: boolean) => {

               if (!actionSubmitted)
                 return;

               this.yearEvent.emit(new ReviewerYearRemoveEvent({
                 id: this.yearId
               }));

             });
  }

  canRemoveYear(): boolean {
    return this.reviewersList.length === 0;
  }

  private setFormValue(value: Reviewers): void {
    this.reviewersArray.setValue(value);
  }

  private getReviewerByIndex(index: number): Reviewer {
    return this.reviewersList[index];
  }

}
