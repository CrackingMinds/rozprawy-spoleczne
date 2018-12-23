import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ContactInfo, IContactInfo } from 'app/models/contact-info';

import { ContactInfoService } from 'app/services/endpoint/contact-info/contact.info.service';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
  selector: 'contact-data',
  templateUrl: './contact.data.component.html',
  styles: []
})
export class ContactDataComponent implements OnInit, OnDestroy {
  contactInfo: IContactInfo = new ContactInfo();

  private subscriptions = new Subscription();

  constructor(private contactDataService: ContactInfoService,
              private basicWrapperService: BasicWrapperService,
              private pageNameService: PageNameService) {}

  ngOnInit() {
    this.pageNameService.setPageName('Kontakt');

    this.subscriptions.add(
      this.contactDataService.fetchContactInfo()
          .subscribe((res: IContactInfo) => {
            this.contactInfo = res;
            this.basicWrapperService.contentLoaded();
          })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
