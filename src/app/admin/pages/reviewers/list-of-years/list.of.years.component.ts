import { Component, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ModalData } from 'app/admin/pages/library/modal/modal.data';
import { ModalService } from 'app/admin/pages/library/modal/modal.service';
import { ReviewerYearDialogComponent } from 'app/admin/pages/reviewers/list-of-years/year-dialog/reviewer.year.dialog.component';
import { ReviewerYear, ReviewerYears, ReviewerYearType } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';
import {
  ReviewerYearAddEvent,
  ReviewerYearEvent,
  ReviewerYearSelectEvent,
  ReviewerYearUpdateEvent
} from 'app/admin/pages/reviewers/list-of-years/reviewer.year.events';

@Component({
	selector: 'rs-list-of-years',
	templateUrl: `list.of.years.component.html`,
	styleUrls: ['./list.of.years.component.scss']
})
export class ListOfYearsComponent implements OnChanges, OnDestroy {

  @Input()
  set years(value: ReviewerYears) {
    this.yearsList = [...value].sort(ReviewerYear.compareFn);
  }

  @Output()
  yearEvent: EventEmitter<ReviewerYearEvent> = new EventEmitter();

  get years(): ReviewerYears {
    return this.yearsList;
  }

  private yearsList: ReviewerYears = [];

  private selectedYearId: string;

  private readonly destroy$: Subject<void> = new Subject();

	constructor(private modal: ModalService) {}

	ngOnChanges(changes: SimpleChanges) {

	  if (changes.years.currentValue) {
      this.selectFirstYear();
    }

  }

	ngOnDestroy() {
	  this.destroy$.next();
	  this.destroy$.complete();
  }

  selectYear(yearId: string): void {
    if (this.isSelected(yearId)) {
      return;
    }

    this.selectedYearId = yearId;

    this.yearEvent.emit(
      new ReviewerYearSelectEvent({ id: yearId })
    );
  }

  openYearAdditionDialog(): void {

	  const modalData: ModalData<ReviewerYearType> = {
	    title: 'Dodanie roku',
      content: ReviewerYearDialogComponent,
      buttons: {
	      submit: {
	        text: 'Dodaj'
        }
      },
      otherParams: undefined
    };

	  const dialogRef = this.modal.open(modalData);
	  dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((year: string) => {
        if (!year) {
          return;
        }

        this.yearEvent.emit(
          new ReviewerYearAddEvent({
            value: year
          })
        );
      });

  }

  openYearEditingDialog(yearId: string): void {

	  const originalYear = this.findYearById(yearId);

    const modalData: ModalData<ReviewerYearType> = {
      title: 'Zmiana roku',
      content: ReviewerYearDialogComponent,
      buttons: {
        submit: {
          text: 'Zapisz'
        }
      },
      otherParams: originalYear
    };

    const dialogRef = this.modal.open(modalData);
    dialogRef.afterClosed()
             .pipe(takeUntil(this.destroy$))
             .subscribe((year: string) => {
               if (!year) {
                 return;
               }

               this.yearEvent.emit(
                 new ReviewerYearUpdateEvent({
                   ...originalYear,
                   value: year
                 })
               );
             });

  }

  isSelected(yearId: string): boolean {
	  return this.selectedYearId === yearId;
  }

  private findYearById(id: string): ReviewerYearType {
	  return this.years.filter((year: ReviewerYearType) => {
	    return year.id === id;
    })[0];
  }

  private selectFirstYear(): void {
    this.years.length && this.selectYear(this.years[0].id);
  }

}
