import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PageComponent } from 'app/client/pages/page.component';

import { ContactInfo, IContactInfo } from 'app/models/contact-info';

import { ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-contact-data',
  templateUrl: './contact.data.component.html',
  styles: []
})
export class ContactDataComponent extends PageComponent implements OnInit, OnDestroy {

  contactInfo: IContactInfo = new ContactInfo();

  private contactInfoLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private contactInfoEndpoint: ContactInfoEndpoint) { super(); }

  ngOnInit() {
    this.contactInfoEndpoint.getContactInfo()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: IContactInfo) => {
          this.contactInfo = data;
          this.contactInfoLoaded$.next();
        });
  }

  ngOnDestroy() {
    this.contactInfoLoaded$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoaded(): Observable<void> {
    return this.contactInfoLoaded$.asObservable();
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.contact());
  }


}
