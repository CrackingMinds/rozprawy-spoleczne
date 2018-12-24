import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ContactInfo, IContactInfo } from 'app/models/contact-info';

import { ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
  selector: 'contact-data',
  templateUrl: './contact.data.component.html',
  styles: []
})
export class ContactDataComponent implements OnInit, OnDestroy {
  contactInfo: IContactInfo = new ContactInfo();

  private subscriptions = new Subscription();

  constructor(private contactInfoEndpoint: ContactInfoEndpoint,
              private pageNameService: PageNameService) {}

  ngOnInit() {
    this.pageNameService.setPageName('Kontakt');

    this.subscriptions.add(
      this.contactInfoEndpoint.getContactInfo()
          .subscribe((res: IContactInfo) => {
            this.contactInfo = res;
          })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
