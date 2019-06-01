import { Component, OnDestroy, OnInit, Inject } from '@angular/core';

import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { firstTrue } from 'app/shared/custom.operators';
import { allFalsy } from 'app/shared/custom.observable.creators';

import { PageComponent } from 'app/client/pages/page.component';

import { ContactInfo } from 'app/models/contact-info';
import { IndexingInfo, IndexingInfoItem } from 'app/models/indexing';

import { CONTACT_INFO_ENDPOINT, ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';
import { INDEXING_INFO_ENDPOINT, IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';

import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-contact-data',
  templateUrl: './contact.data.component.html',
  styles: []
})
export class ContactDataComponent extends PageComponent implements OnInit, OnDestroy {

  contactInfo: ContactInfo;
  issn: IndexingInfoItem;

  private readonly contactInfoLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private readonly indexingInfoLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(CONTACT_INFO_ENDPOINT) private readonly contactInfoEndpoint: ContactInfoEndpoint,
              @Inject(INDEXING_INFO_ENDPOINT) private readonly indexingInfoEndpoint: IndexingInfoEndpoint) { super(); }

  ngOnInit() {
    this.contactInfoEndpoint.getContactInfo()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: ContactInfo) => {
          this.contactInfo = data;
          this.contactInfoLoading$.next(false);
        });

    this.indexingInfoEndpoint.getIndexingInfo()
      .pipe(
        map((indexingInfo: IndexingInfo) => {
          return indexingInfo.filter((item: IndexingInfoItem) => item.name === 'ISSN')[0];
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((issn: IndexingInfoItem) => {
        this.issn = issn;
        this.indexingInfoLoading$.next(false);
      });
  }

  ngOnDestroy() {
    this.contactInfoLoading$.complete();
    this.indexingInfoLoading$.complete();

    this.destroy$.next();
    this.destroy$.complete();
  }

  observePageLoaded(): Observable<void> {
    return allFalsy(
      this.contactInfoLoading$.asObservable(),
      this.indexingInfoLoading$.asObservable()
    ).pipe(firstTrue());
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.contact());
  }


}
