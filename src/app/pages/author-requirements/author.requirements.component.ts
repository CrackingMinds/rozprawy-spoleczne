import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ContactInfo, IContactInfo } from 'app/models/contact-info';

import { ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
    selector: 'author-requirements',
    templateUrl: './author.requirements.component.html',
    styles: []
})
export class AuthorRequirementsComponent implements OnInit, OnDestroy {
    contactInfo: IContactInfo = new ContactInfo();
    dataLoaded: boolean = false;

    private subscriptions = new Subscription();

    constructor(private contactInfoEndpoint: ContactInfoEndpoint,
                private pageNameService: PageNameService) {}

    ngOnInit() {
        this.pageNameService.setPageName('Zasady publikacji prac');

        this.subscriptions.add(
          this.contactInfoEndpoint.getContactInfo()
              .subscribe((res: IContactInfo) => {
                this.contactInfo = res;
                this.dataLoaded = true;
              })
        );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}
