import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ContactData, IContactData } from 'app/models/contact-data';

import { ContactDataService } from 'app/pages/contact-data/contact.data.service';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
  selector: 'contact-data',
  templateUrl: './contact.data.component.html',
  styles: []
})
export class ContactDataComponent implements OnInit, OnDestroy {
  contactInfo: IContactData = new ContactData();

  private subscriptions = new Subscription();

  constructor(private contactDataService: ContactDataService,
              private basicWrapperService: BasicWrapperService,
              private pageNameService: PageNameService) {}

  ngOnInit() {
    this.pageNameService.setPageName('Kontakt');

    this.subscriptions.add(
      this.contactDataService.getContactInfo()
          .subscribe((res: IContactData) => {
            this.contactInfo = res;
            this.basicWrapperService.contentLoaded();
          })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
