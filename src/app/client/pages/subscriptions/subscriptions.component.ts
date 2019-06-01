import { Component, OnDestroy, OnInit, Inject } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { firstTrue } from 'app/shared/custom.operators';
import { allFalsy } from 'app/shared/custom.observable.creators';

import { PageComponent } from 'app/client/pages/page.component';

import { SubscriptionsInfo } from 'app/models/subscriptions';
import { ContactInfo } from 'app/models/contact-info';

import { SUBSCRIPTIONS_ENDPOINT, SubscriptionsEndpoint } from 'app/endpoints/endpoint/subscriptions/subscriptions.endpoint';
import { CONTACT_INFO_ENDPOINT, ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';

import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-subscriptions',
  templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent extends PageComponent implements OnInit, OnDestroy {

  subscriptionsInfo: SubscriptionsInfo;
  contactInfo: ContactInfo;

  private readonly subscriptionsInfoLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private readonly contactInfoLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(SUBSCRIPTIONS_ENDPOINT) private readonly subscriptionsEndpoint: SubscriptionsEndpoint,
              @Inject(CONTACT_INFO_ENDPOINT) private readonly contactInfoEndpoint: ContactInfoEndpoint) { super(); }

  ngOnInit() {
    this.subscriptionsEndpoint.getSubscriptionsInfo()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: SubscriptionsInfo) => {
          this.subscriptionsInfo = data;
          this.subscriptionsInfoLoading$.next(false);
        });

    this.contactInfoEndpoint.getContactInfo()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: ContactInfo) => {
          this.contactInfo = data;
          this.contactInfoLoading$.next(false);
        });
  }

  ngOnDestroy() {
    this.subscriptionsInfoLoading$.complete();
    this.contactInfoLoading$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  observePageLoaded(): Observable<void> {
    return allFalsy(
      this.subscriptionsInfoLoading$.asObservable(),
      this.contactInfoLoading$.asObservable()
    ).pipe(firstTrue());
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.subscriptions());
  }

}
