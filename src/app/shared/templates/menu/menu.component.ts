import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { IContactData } from 'app/models/contact-data';
import { ContactDataService } from 'app/pages/contact-data/contact.data.service';
import { Subscription } from 'rxjs/Subscription';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {
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
        },
        {
            title: 'Standardy etyczne',
            url: '/ethics-statement',
            param: ''
        }
    ];

    private subscriptions = new Subscription();

    constructor(private contactDataService: ContactDataService,
                private basicWrapperService: BasicWrapperService) {}

    ngOnInit() {
        this.subscriptions.add(
          this.contactDataService.getContactInfo()
              .pipe(take(1))
              .subscribe((res: IContactData) => {
                this.contactInfo = res;
                this.contactDataLoaded = true;
                this.basicWrapperService.menuLoaded();
              })
        );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }

}
