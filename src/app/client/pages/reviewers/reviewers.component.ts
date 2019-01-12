import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Page } from 'app/client/pages/page';

import { IReviewer } from 'app/models/reviewer';

import { ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';

@Component({
  selector: 'rs-reviewers',
  templateUrl: './reviewers.component.html'
})
export class ReviewersComponent extends Page implements OnInit, OnDestroy {

  reviewersData: IReviewer[];

  private reviewersLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private reviewersEndpoint: ReviewersEndpoint) {
    super();
  }

  ngOnInit() {

    this.reviewersEndpoint.getReviewers()
        .pipe(takeUntil(this.unsubscribe$))
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
    return of('Recenzenci');
  }

}
