import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ContactData, IContactData } from 'app/models/contact-data';

import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';
import { ContactDataService } from 'app/pages/contact-data/contact.data.service';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
    selector: 'author-requirements',
    templateUrl: './author.requirements.component.html',
    styles: []
})
export class AuthorRequirementsComponent implements OnInit, OnDestroy {
    contactInfo: IContactData = new ContactData();
    dataLoaded: boolean = false;

    private subscriptions = new Subscription();

    constructor(private contactDataService: ContactDataService,
                private basicWrapperService: BasicWrapperService,
                private pageNameService: PageNameService) {}

    ngOnInit() {
        this.pageNameService.setPageName('Zasady publikacji prac');

        this.subscriptions.add(
          this.contactDataService.getContactInfo()
              .subscribe((res: IContactData) => {
                this.contactInfo = res;
                this.dataLoaded = true;
                this.basicWrapperService.contentLoaded();
              })
        );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}
