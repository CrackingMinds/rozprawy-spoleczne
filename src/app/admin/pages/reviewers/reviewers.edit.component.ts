import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, of, Subject, zip } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import * as reviewersRootSelectors from 'app/admin/pages/reviewers/store/selectors/reviewers.root.selectors';

import { PageComponent } from 'app/client/pages/page.component';
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
  UpdateReviewerYearAction
} from 'app/admin/pages/reviewers/store/actions/reviewer.year.actions';
import { ReviewersRootState } from 'app/admin/pages/reviewers/store/reducers/reviewers.root.reducer';
import { AddReviewerAction, LoadReviewersAction, RemoveReviewerAction, UpdateReviewerAction } from 'app/admin/pages/reviewers/store/actions/reviewers.actions';

@Component({
	selector: 'rs-reviewers-edit',
	templateUrl: `reviewers.edit.component.html`,
  styleUrls: ['./reviewers.edit.component.scss']
})
export class ReviewersEditComponent implements PageComponent, OnInit, OnDestroy {

  reviewersLoading$: Observable<boolean>;
  reviewerYearsLoading$: Observable<boolean>;

  contentLoading$: Observable<boolean>;

  years: ReviewerYears = [];

  reviewers: Reviewers;

  selectedYearId: string;

  private readonly destroy$: Subject<void> = new Subject();

	constructor(private store: Store<ReviewersRootState>) {}

	ngOnInit() {

	  this.store.select(reviewersRootSelectors.getReviewerYears)
        .pipe(takeUntil(this.destroy$))
        .subscribe((reviewerYears: ReviewerYears) => this.years = reviewerYears);

	  this.store.select(reviewersRootSelectors.getReviewers)
      .pipe(takeUntil(this.destroy$))
      .subscribe((reviewers: Reviewers) => this.reviewers = reviewers);

    this.initSpinnerManagers();

    this.store.dispatch(new LoadReviewerYearsAction());
	}

	ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  observeContentLoading(): Observable<boolean> {
    return of(false);
  }

  observePageName(): Observable<string> {
    return of(AdminPagesResolver.reviewers().title);
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
        this.store.dispatch(new RemoveReviewerAction(reviewerId));
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
        const reviewerYearId = (event as ReviewerYearUpdateEvent).payload.id;
        this.store.dispatch(new RemoveReviewerYearAction(reviewerYearId));
        break;
      }

    }
  }

  private initSpinnerManagers(): void {
    this.reviewersLoading$ = this.store.select(reviewersRootSelectors.getReviewersLoading)
                                 .pipe(takeUntil(this.destroy$));

    this.reviewerYearsLoading$ = this.store.select(reviewersRootSelectors.getReviewerYearsLoading)
                                     .pipe(takeUntil(this.destroy$));

    this.initMainSpinnerManager();
  }

  private initMainSpinnerManager(): void {
	  this.contentLoading$ = zip(
	    this.reviewersLoading$,
      this.reviewerYearsLoading$
    ).pipe(
      map((contentLoading: boolean[]) => {
        const reviewersLoading = contentLoading[0];
        const reviewerYearsLoading = contentLoading[1];
        return reviewersLoading && reviewerYearsLoading;
      })
    );
  }

}
