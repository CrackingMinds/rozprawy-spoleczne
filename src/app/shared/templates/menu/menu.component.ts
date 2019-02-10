import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IContactInfo } from 'app/models/contact-info';

import { Menu, MenuItems } from 'app/shared/templates/menu/menu';
import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';
import { ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';

import { AsyncComponent } from 'app/client/pages/async.component';

@Component({
  selector: 'rs-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements AsyncComponent, OnInit, OnDestroy {

  contactInfo: IContactInfo;
  menuItems: MenuItems = new Menu()
    .withPage({ title: 'Bieżący numer', url: RoutesResolver.currentIssue() })
    .withPage({ title: 'Archiwum', url: RoutesResolver.archive() })
    .withPage({ title: 'O czasopiśmie', url: RoutesResolver.about() })
    .withPage({ title: 'Rada Redakcyjna i Rada Naukowa', url: RoutesResolver.editorialAndScientificBoard() })
    .withPage({ title: 'Recenzenci', url: RoutesResolver.reviewers() })
    .withPage({ title: 'Bazy indeksacyjne', url: RoutesResolver.indexing() })
    .withPage({ title: 'Prenumerata', url: RoutesResolver.subscriptions() })
    .withPage({ title: 'Kontakt', url: RoutesResolver.contact() })
    .withPage({ title: 'Zasady publikacji prac', url: RoutesResolver.requirements() })
    .withPage({ title: 'Standardy etyczne', url: RoutesResolver.ethicsStatement() })
    .withPage({ title: 'RODO', url: RoutesResolver.rodo() })
    .items;

  private contentLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private contactInfoEndpoint: ContactInfoEndpoint) {}

  ngOnInit() {
    this.contactInfoEndpoint.getContactInfo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: IContactInfo) => {
        this.contactInfo = data;
        this.contentLoaded$.next();
      });
  }

  ngOnDestroy() {
    this.contentLoaded$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoaded(): Observable<void> {
    return this.contentLoaded$.asObservable();
  }

}
