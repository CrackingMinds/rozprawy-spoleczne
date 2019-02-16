import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IContactInfo } from 'app/models/contact-info';

import { Menu, MenuItems } from 'app/shared/templates/menu/menu';
import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';
import { ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';

import { AsyncComponent } from 'app/client/pages/async.component';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements AsyncComponent, OnInit, OnDestroy {

  contactInfo: IContactInfo;
  menuItems: MenuItems = new Menu()
    .withPage({ title: ClientPageNamesResolver.currentIssue(), url: RoutesResolver.currentIssue() })
    .withPage({ title: ClientPageNamesResolver.archive(), url: RoutesResolver.archive() })
    .withPage({ title: ClientPageNamesResolver.about(), url: RoutesResolver.about() })
    .withPage({ title: ClientPageNamesResolver.editorialAndScientificBoard(), url: RoutesResolver.editorialAndScientificBoard() })
    .withPage({ title: ClientPageNamesResolver.reviewers(), url: RoutesResolver.reviewers() })
    .withPage({ title: ClientPageNamesResolver.indexing(), url: RoutesResolver.indexing() })
    .withPage({ title: ClientPageNamesResolver.subscriptions(), url: RoutesResolver.subscriptions() })
    .withPage({ title: ClientPageNamesResolver.contact(), url: RoutesResolver.contact() })
    .withPage({ title: ClientPageNamesResolver.requirements(), url: RoutesResolver.requirements() })
    .withPage({ title: ClientPageNamesResolver.ethicsStatement(), url: RoutesResolver.ethicsStatement() })
    .withPage({ title: ClientPageNamesResolver.rodo(), url: RoutesResolver.rodo() })
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
