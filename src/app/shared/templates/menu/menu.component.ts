import {Component, OnInit} from '@angular/core';
import {IContactData} from "../../../models/contact-data";
import {SpinnerService} from "../../../services/spinner/spinner.service";
import {ContactDataService} from "../../../pages/contact-data/contact.data.service";
import {PageBase} from "../../page.base";
import {PageNameService} from "../../services/page.name.service";

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
    contactInfo: IContactData;
    contactDataLoaded: boolean = false;
    menuItems = [
        {
            title: 'Bieżący numer',
            url: '/issues/current'
        },
        {
            title: 'Archiwum',
            url: '/archive',
            param: ''
        },
        {
            title: 'O czasopiśmie',
            url: '/about',
            param: ''
        },
        {
            title: 'Rada Redakcyjna i Rada Naukowa',
            url: '/editorial-scientific-board',
            param: ''
        },
        {
            title: 'Recenzenci',
            url: '/reviewers',
            param: ''
        },
        {
            title: 'Bazy indeksacyjne',
            url: '/indexing',
            param: ''
        },
        {
            title: 'Prenumerata',
            url: '/subscriptions',
            param: ''
        },
        {
            title: 'Kontakt',
            url: '/contact',
            param: ''
        },
        {
            title: 'Zasady publikacji prac',
            url: '/requirements',
            param: ''
        }
    ];

    constructor(private contactDataService: ContactDataService,
                private spinnerService: SpinnerService) {
    }

    ngOnInit() {
        let asyncAction = this.getContactData();
        this.spinnerService.addMenuLoadPromise(asyncAction);
    }

    getContactData(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.contactDataService.getContactInfo()
                .subscribe((res: IContactData) => {
                    self.contactInfo = res;
                    self.contactDataLoaded = true;
                    resolve();
                })
        });
    }

}
