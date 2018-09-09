import {Component, OnInit} from '@angular/core';
import {ContactData, IContactData} from "../../models/contact-data";
import {SpinnerService} from "../../services/spinner/spinner.service";
import {ContactDataService} from "../contact-data/contact.data.service";
import {PageBase} from "../../shared/page.base";
import {PageNameService} from "../../shared/services/page.name.service";

@Component({
    selector: 'author-requirements',
    templateUrl: './author.requirements.component.html',
    styles: []
})
export class AuthorRequirementsComponent extends PageBase implements OnInit {
    contactInfo: IContactData = new ContactData();
    dataLoaded: boolean = false;

    constructor(private contactDataService: ContactDataService,
                private spinnerService: SpinnerService,
                private pageNameService: PageNameService) {
        super(
            spinnerService,
            pageNameService
        );
    }

    ngOnInit() {
        this.asyncAction = this.getContactData();
        let self = this;
        this.asyncAction
            .then(function () {
                self.changePageName('Zasady publikacji prac');
            });
        super.ngOnInit();
    }

    getContactData(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.contactDataService.getContactInfo()
                .subscribe((res: IContactData) => {
                    self.contactInfo = res;
                    self.dataLoaded = true;
                    resolve();
                })
        });
    }
}
