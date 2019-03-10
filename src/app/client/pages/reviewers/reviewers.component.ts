import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Observable, of } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { PageComponent } from 'app/client/pages/page.component';

import { IReviewer } from 'app/models/reviewer';

import { ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

type ReviewersDataType = {
  year: number;
  reviewers: IReviewer[];
};

@Component({
  selector: 'rs-reviewers',
  templateUrl: './reviewers.component.html'
})
export class ReviewersComponent extends PageComponent implements OnInit, OnDestroy {

  reviewersData: IReviewer[];

  private reviewersLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private reviewersEndpoint: ReviewersEndpoint) {
    super();
  }

  ngOnInit() {

    this.reviewersEndpoint.getReviewers()
        .pipe(
          map((data: any) => {
            return [...data].sort((a: ReviewersDataType, b: ReviewersDataType) => {

              const aYear = a.year;
              const bYear = b.year;

              if (aYear < bYear) {
                return 1;
              } else if (aYear > bYear) {
                return -1;
              } else {
                return 0;
              }

            });
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((data: IReviewer[]) => {
          this.reviewersData = data;
          this.reviewersLoaded$.next();
        });
  }

  ngOnDestroy() {
    this.reviewersLoaded$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoaded(): Observable<void> {
    return this.reviewersLoaded$.asObservable();
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.reviewers());
  }

}
