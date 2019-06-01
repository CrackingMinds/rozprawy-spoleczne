import { Component, OnDestroy, OnInit, Inject } from '@angular/core';

import { Observable, of, Subject, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { firstFalse } from 'app/shared/custom.operators';

import { PageComponent } from 'app/client/pages/page.component';

import { ContactInfo } from 'app/models/contact-info';

import { CONTACT_INFO_ENDPOINT, ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-author-requirements',
  templateUrl: './author.requirements.component.html',
  styles: []
})
export class AuthorRequirementsComponent extends PageComponent implements OnInit, OnDestroy {

  contactInfo: ContactInfo;

  private readonly contactInfoLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(@Inject(CONTACT_INFO_ENDPOINT) private readonly contactInfoEndpoint: ContactInfoEndpoint) { super(); }

  ngOnInit() {
    this.contactInfoEndpoint.getContactInfo()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: ContactInfo) => {
          this.contactInfo = data;
          this.contactInfoLoading$.next(false);
        });
  }

  ngOnDestroy() {
    this.contactInfoLoading$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observePageLoaded(): Observable<void> {
    return this.contactInfoLoading$.asObservable().pipe(firstFalse());
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.requirements());
  }


}
