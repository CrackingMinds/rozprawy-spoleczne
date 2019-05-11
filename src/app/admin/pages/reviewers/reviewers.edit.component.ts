import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { allFalsy } from 'app/shared/custom.observable.creators';
import { firstTrue } from 'app/shared/custom.operators';

import * as reviewersRootSelectors from 'app/admin/pages/reviewers/store/selectors/reviewers.root.selectors';

import { AdminPageComponent } from 'app/admin/pages/admin.page.component';
import { AdminPagesResolver } from 'app/shared/routing-helpers/admin.pages.resolver';
import { Reviewers } from 'app/models/reviewer';
import {
  ReviewerCreateEvent,
  ReviewerEvent,
  ReviewerEventType,
  ReviewerRemoveEvent,
  ReviewerUpdateEvent
} from 'app/admin/pages/reviewers/list-of-reviewers/reviewer.event';
import {
  ReviewerYearAddEvent,
  ReviewerYearEvent,
  ReviewerYearEventType,
  ReviewerYearSelectEvent,
  ReviewerYearUpdateEvent
} from 'app/admin/pages/reviewers/list-of-years/reviewer.year.events';
import { ReviewerYears } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';
import {
  AddReviewerYearAction,
  LoadReviewerYearsAction,
  RemoveReviewerYearAction,
  ResetReviewerYearsStateAction,
  UpdateReviewerYearAction
} from 'app/admin/pages/reviewers/store/actions/reviewer.year.actions';
import { ReviewersRootState } from 'app/admin/pages/reviewers/store/reducers/reviewers.root.reducer';
import {
  AddReviewerAction,
  LoadReviewersAction,
  RemoveReviewerAction,
  ResetReviewersStateAction,
  UpdateReviewerAction
} from 'app/admin/pages/reviewers/store/actions/reviewers.actions';

@Component({
	selector: 'rs-reviewers-edit',
	templateUrl: `reviewers.edit.component.html`,
  styleUrls: ['./reviewers.edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewersEditComponent extends AdminPageComponent implements OnInit, OnDestroy {

  readonly reviewerYearsLoading$: Subject<boolean> = new Subject();
  readonly reviewersLoading$: Subject<boolean> = new Subject();

  contentLoading: boolean = false;

  years: ReviewerYears = [];

  reviewers: Reviewers;

  selectedYearId: string;

  private readonly destroy$: Subject<void> = new Subject();

	constructor(private store: Store<ReviewersRootState>) { super(); }

	ngOnInit() {

    this.initSpinnerManagers();

    this.store.select(reviewersRootSelectors.getReviewerYears)
        .pipe(takeUntil(this.destroy$))
        .subscribe((reviewerYears: ReviewerYears) => this.years = reviewerYears);

	  this.store.select(reviewersRootSelectors.getReviewers)
      .pipe(takeUntil(this.destroy$))
      .subscribe((reviewers: Reviewers) => this.reviewers = reviewers);

    this.store.dispatch(new LoadReviewerYearsAction());
	}

	ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    this.resetState();
  }

  observePageName(): Observable<string> {
    return of(AdminPagesResolver.reviewers().title);
  }

  observePageLoaded(): Observable<void> {
    return this.subscribeForAllResourcesLoad();
  }

  onReviewerEvent(event: ReviewerEvent): void {

    switch (event.type) {

      case ReviewerEventType.CREATE: {
        const newReviewer = (event as ReviewerCreateEvent).payload;
        this.store.dispatch(new AddReviewerAction(newReviewer));
        break;
      }

      case ReviewerEventType.UPDATE: {
        const updatedReviewer = (event as ReviewerUpdateEvent).payload;
        this.store.dispatch(new UpdateReviewerAction(updatedReviewer));
        break;
      }

      case ReviewerEventType.REMOVE: {
        const reviewerId = (event as ReviewerRemoveEvent).payload.reviewerId;
        this.store.dispatch(new RemoveReviewerAction({ reviewerId: reviewerId, yearId: this.selectedYearId }));
        break;
      }

    }

  }

  onYearEvent(event: ReviewerYearEvent): void {

    switch (event.type) {

      case ReviewerYearEventType.SELECT: {
        this.selectedYearId = (event as ReviewerYearSelectEvent).payload.id;
        this.store.dispatch(new LoadReviewersAction({
          reviewerYearId: this.selectedYearId
        }));
        break;
      }

      case ReviewerYearEventType.ADD: {
        const newReviewerYear = (event as ReviewerYearAddEvent).payload;
        this.store.dispatch(new AddReviewerYearAction(newReviewerYear));
        break;
      }

      case ReviewerYearEventType.UPDATE: {
        const updatedReviewerYear = (event as ReviewerYearUpdateEvent).payload;
        this.store.dispatch(new UpdateReviewerYearAction(updatedReviewerYear));
        break;
      }

      case ReviewerYearEventType.REMOVE: {
        this.showMainSpinner();

        const reviewerYearId = (event as ReviewerYearUpdateEvent).payload.id;
        this.store.dispatch(new RemoveReviewerYearAction(reviewerYearId));

        this.subscribeForAllResourcesLoad()
            .subscribe(() => this.hideMainSpinner());

        break;
      }

    }
  }

  private initSpinnerManagers(): void {
    this.store.select(reviewersRootSelectors.getReviewerYearsLoading)
        .pipe(takeUntil(this.destroy$))
        .subscribe((loading: boolean) => this.reviewerYearsLoading$.next(loading));

    this.store.select(reviewersRootSelectors.getReviewersLoading)
        .pipe(takeUntil(this.destroy$))
        .subscribe((loading: boolean) => this.reviewersLoading$.next(loading));
  }

  private resetState(): void {
	  this.store.dispatch(new ResetReviewerYearsStateAction());
    this.store.dispatch(new ResetReviewersStateAction());
  }

  private showMainSpinner(): void {
	  this.contentLoading = true;
  }

  private hideMainSpinner(): void {
	  this.contentLoading = false;
  }

  private subscribeForAllResourcesLoad(): Observable<void> {
	  return allFalsy(
      this.reviewerYearsLoading$.asObservable(),
      this.reviewersLoading$.asObservable()
    ).pipe(firstTrue());
  }

}
