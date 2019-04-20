import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';

import { withMinDuration } from 'app/shared/custom.operators';

import { PageComponent } from 'app/client/pages/page.component';

import { Reviewers } from 'app/models/reviewer';

import { ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';
import { ReviewerYearsEndpoint } from 'app/endpoints/endpoint/reviewer-years/reviewer.years.endpoint';
import { ReviewerYear, ReviewerYears, ReviewerYearType } from 'app/admin/pages/reviewers/list-of-years/reviewer.year';
import { CustomSorting } from 'app/shared/custom.sorting';

@Component({
  selector: 'rs-reviewers',
  templateUrl: './reviewers.component.html'
})
export class ReviewersComponent extends PageComponent implements OnInit, OnDestroy {

  private yearToReviewersMap: { [year: string]: Reviewers } = {};

  private reviewerYears: ReviewerYears;

  private expandedYearId: string;

  private readonly contentLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private reviewersEndpoint: ReviewersEndpoint,
              private reviewerYearsEndpoint: ReviewerYearsEndpoint) {
    super();
  }

  ngOnInit() {
    this.fetchReviewerYears();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoading(): Observable<boolean> {
    return this.contentLoading$.asObservable();
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
    const reviewers = this.yearToReviewersMap[yearId];

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
    this.fetchReviewers()
        .pipe(withMinDuration(250))
        .subscribe(() => {
          this.contentLoading$.next(false);
        });
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
            this.yearToReviewersMap[reviewerYear.value] = [];
          });

          this.expandedYearId = this.reviewerYears[0].id;
        });
  }

  private fetchReviewers(): Observable<void> {
    const reviewers$ = this.reviewersEndpoint.getReviewers(this.getExpandedYearId())
                           .pipe(
                             first(),
                             map((reviewers: Reviewers) => [...reviewers].sort(CustomSorting.byCustomOrder))
                           );

    reviewers$
      .subscribe((reviewers: Reviewers) => {
        this.yearToReviewersMap[this.getExpandedYearId()] = reviewers;
      });

    return reviewers$
      .pipe(map(() => null));
  }

}
