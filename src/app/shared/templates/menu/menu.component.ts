import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { ClientPageState, getClientPageContactInfo } from 'app/client/store/client.page.reducers';

import { IContactData } from 'app/models/contact-data';
import { LoadContactInfo } from 'app/store/actions/contact.info.actions';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  contactInfo$: Observable<IContactData>;
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

  constructor(private store: Store<ClientPageState>) {
  }

    ngOnInit() {
      this.contactInfo$ = this.store.select(getClientPageContactInfo);
      this.store.dispatch(new LoadContactInfo());
    }

}
