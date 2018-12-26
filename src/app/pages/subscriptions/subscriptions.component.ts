import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Page } from 'app/pages/page';

import { ISubsriptionsInfo } from 'app/models/subscriptions';

import { SubscriptionsEndpoint } from 'app/endpoints/endpoint/subscriptions/subscriptions.endpoint';

@Component({
  selector: 'rs-subscriptions',
  templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent extends Page implements OnInit, OnDestroy {

  subscriptionsInfo: ISubsriptionsInfo;

  private subscriptionsInfoLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private subscriptionsEndpoint: SubscriptionsEndpoint) {
    super();
  }

  ngOnInit() {

    this.subscriptionsEndpoint.getSubscriptionsInfo()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: ISubsriptionsInfo) => {
          this.subscriptionsInfo = data;
          this.subscriptionsInfoLoaded$.next();
        });
  }

  ngOnDestroy() {
    this.subscriptionsInfoLoaded$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoaded(): Observable<void> {
    return this.subscriptionsInfoLoaded$.asObservable();
  }

  observePageName(): Observable<string> {
    return of('Prenumerata');
  }

}
