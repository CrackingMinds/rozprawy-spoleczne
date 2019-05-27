import { Component, OnDestroy, OnInit, ViewEncapsulation, Inject } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { firstFalse, withMinDuration } from 'app/shared/custom.operators';

import { PageComponent } from 'app/client/pages/page.component';

import { Reviewers } from 'app/models/reviewer';

import { REVIEWERS_ENDPOINT, ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';
import { REVIEWER_YEARS_ENDPOINT, ReviewerYearsEndpoint } from 'app/endpoints/endpoint/reviewer-years/reviewer.years.endpoint';
import { ReviewerYear, ReviewerYears, ReviewerYearType } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';

type YearData = {
  isLoading: boolean;
  reviewers: Reviewers
};

@Component({
  selector: 'rs-reviewers',
  templateUrl: './reviewers.component.html',
  styleUrls: ['./reviewers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewersComponent extends PageComponent implements OnInit, OnDestroy {

  yearData: { [yearId: string]: YearData } = {};

  private reviewerYears: ReviewerYears;

  private expandedYearId: string;

  private readonly contentLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(@Inject(REVIEWERS_ENDPOINT) private readonly reviewersEndpoint: ReviewersEndpoint,
              @Inject(REVIEWER_YEARS_ENDPOINT) private readonly reviewerYearsEndpoint: ReviewerYearsEndpoint) {
    super();
  }

  ngOnInit() {
    this.fetchReviewerYears();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observePageLoaded(): Observable<void> {
    return this.contentLoading$.asObservable().pipe(firstFalse());
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.reviewers());
  }

  getExpandedYearId(): string {
    return this.expandedYearId;
  }

  getReviewerYears(): ReviewerYears {
    return this.reviewerYears;
  }

  getReviewersForYear(yearId: string): Reviewers {
    const yearData = this.yearData[yearId];

    if (!yearData) {
      return [];
    }

    const reviewers = yearData.reviewers;

    if (!reviewers)
      return [];

    return reviewers;
  }

  checkIfYearExpanded(yearId: string): boolean {
    return yearId === this.getExpandedYearId();
  }

  checkIfReviewersForYearExist(yearId: string): boolean {
    return this.getReviewersForYear(yearId).length > 0;
  }

  onYearExpanded(yearId: string): void {
    this.expandedYearId = yearId;

    this.contentLoading$.next(true);
    this.setReviewerYearLoading(this.getExpandedYearId(), true);

    this.fetchReviewers()
        .pipe(withMinDuration(700))
        .subscribe((reviewers: Reviewers) => {
          this.setReviewersForYear(this.getExpandedYearId(), reviewers);
          this.setReviewerYearLoading(this.getExpandedYearId(), false);
          this.contentLoading$.next(false);
        });
  }

  checkIfShouldShowSpinner(yearId: string): boolean {
    const yearData = this.yearData[yearId];
    if (!yearData) {
      return false;
    } else {
      return yearData.isLoading && this.checkIfYearExpanded(yearId);
    }
  }

  private fetchReviewerYears(): void {
    this.reviewerYearsEndpoint.getReviewerYears()
        .pipe(
          map((reviewerYears: ReviewerYears) => [...reviewerYears].sort(ReviewerYear.compareFn)),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((reviewerYears: ReviewerYears) => {
          this.reviewerYears = reviewerYears;

          this.reviewerYears.forEach((reviewerYear: ReviewerYearType) => {
            this.yearData[reviewerYear.id] = {
              isLoading: false,
              reviewers: []
            };
          });

          this.expandedYearId = this.reviewerYears[0].id;
        });
  }

  private fetchReviewers(): Observable<Reviewers> {
    return this.reviewersEndpoint.getReviewers(this.getExpandedYearId());
  }

  private setReviewerYearLoading(yearId: string, loading: boolean): void {
    this.yearData[yearId].isLoading = loading;
  }

  private setReviewersForYear(yearId: string, reviewers: Reviewers): void {
    this.yearData[yearId].reviewers = reviewers;
  }

}
