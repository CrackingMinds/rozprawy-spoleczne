import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IContactInfo } from 'app/models/contact-info';
import { ContactInfoService } from 'app/services/endpoint/contact-info/contact.info.service';

import { Menu, MenuItems } from 'app/shared/templates/menu/menu';
import { RoutesResolver } from 'app/routes-resolver/routes.resolver';

@Component({
  selector: 'rs-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {

  contactInfo: IContactInfo;
  menuItems: MenuItems = new Menu()
    .withPage({ title: 'Bieżący numer', url: RoutesResolver.currentIssue })
    .withPage({ title: 'Archiwum', url: RoutesResolver.archive })
    .withPage({ title: 'O czasopiśmie', url: RoutesResolver.about })
    .withPage({ title: 'Rada Redakcyjna i Rada Naukowa', url: RoutesResolver.editorialAndScientificBoard })
    .withPage({ title: 'Recenzenci', url: RoutesResolver.reviewers })
    .withPage({ title: 'Bazy indeksacyjne', url: RoutesResolver.indexing })
    .withPage({ title: 'Prenumerata', url: RoutesResolver.subscriptions })
    .withPage({ title: 'Kontakt', url: RoutesResolver.contact })
    .withPage({ title: 'Zasady publikacji prac', url: RoutesResolver.requirements })
    .withPage({ title: 'Standardy etyczne', url: RoutesResolver.ethicsStatement })
    .items;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private contactInfoService: ContactInfoService) {}

  ngOnInit() {
    this.contactInfoService.fetchContactInfo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: IContactInfo) => {
        this.contactInfo = data;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
