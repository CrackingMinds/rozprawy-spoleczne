import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Observable, of, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PageComponent } from 'app/client/pages/page.component';

import { ISubsriptionsInfo } from 'app/models/subscriptions';

import { SubscriptionsEndpoint } from 'app/endpoints/endpoint/subscriptions/subscriptions.endpoint';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-subscriptions',
  templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent extends PageComponent implements OnInit, OnDestroy {

  subscriptionsInfo: ISubsriptionsInfo;

  private readonly subscriptionsInfoLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private subscriptionsEndpoint: SubscriptionsEndpoint) {
    super();
  }

  ngOnInit() {

    this.subscriptionsEndpoint.getSubscriptionsInfo()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: ISubsriptionsInfo) => {
          this.subscriptionsInfo = data;
          this.subscriptionsInfoLoading$.next(false);
        });
  }

  ngOnDestroy() {
    this.subscriptionsInfoLoading$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoading(): Observable<boolean> {
    return this.subscriptionsInfoLoading$.asObservable();
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.subscriptions());
  }

}
