import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Page } from 'app/client/pages/page';

import { ContactInfo, IContactInfo } from 'app/models/contact-info';

import { ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';

@Component({
  selector: 'rs-author-requirements',
  templateUrl: './author.requirements.component.html',
  styles: []
})
export class AuthorRequirementsComponent extends Page implements OnInit, OnDestroy {

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
    return of('Zasady publikacji prac');
  }


}
