import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ContactInfo, IContactInfo } from 'app/models/contact-info';

import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';
import { ContactInfoService } from 'app/services/endpoint/contact-info/contact.info.service';
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

    constructor(private contactDataService: ContactInfoService,
                private basicWrapperService: BasicWrapperService,
                private pageNameService: PageNameService) {}

    ngOnInit() {
        this.pageNameService.setPageName('Zasady publikacji prac');

        this.subscriptions.add(
          this.contactDataService.fetchContactInfo()
              .subscribe((res: IContactInfo) => {
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
