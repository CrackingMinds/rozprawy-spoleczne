import { Component, OnInit } from '@angular/core';
import {ContactData, IContactData} from "../../models/contact-data";
import {ContactDataService} from "./contact.data.service";
import {SpinnerService} from "../../services/spinner/spinner.service";
import {PageBase} from "../../shared/page.base";
import {PageNameService} from "../../shared/services/page.name.service";

@Component({
  selector: 'contact-data',
  templateUrl: './contact.data.component.html',
  styles: []
})
export class ContactDataComponent extends PageBase implements OnInit {
  contactInfo: IContactData = new ContactData();

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
              self.changePageName('Kontakt');
          });
      super.ngOnInit();
  }

  getContactData(): Promise<any> {
    let self = this;
    return new Promise(function (resolve, reject) {
        self.contactDataService.getContactInfo()
            .subscribe((res: IContactData) => {
              self.contactInfo = res;
              resolve();
            })
    });
  }
}
