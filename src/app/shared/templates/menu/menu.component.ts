import {Component, OnInit} from '@angular/core';
import {IContactData} from "../../../models/contact-data";
import {SpinnerService} from "../../../services/spinner/spinner.service";
import {ContactDataService} from "../../../pages/contact-data/contact.data.service";

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

    constructor(private contactDataService: ContactDataService) {
    }

    ngOnInit() {
        this.getContactData();
        // this.spinnerService.initializeSpinner(this.getContactData());
    }

    getContactData(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.contactDataService.getContactInfo()
                .subscribe((res) => {
                    self.contactInfo = res;
                    self.contactDataLoaded = true;
                    resolve();
                })
        });
    }

}
