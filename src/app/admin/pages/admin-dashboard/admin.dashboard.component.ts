import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';

import { PageComponent } from 'app/client/pages/page.component';
import { Menu, MenuItems } from 'app/shared/templates/menu/menu';
import { AdminPagesResolver } from 'app/shared/routing-helpers/admin.pages.resolver';
import { RoutesComposer } from 'app/shared/routing-helpers/routes.composer';

@Component({
  selector: 'rs-admin-dashboard',
  templateUrl: './admin.dashboard.component.html',
  styleUrls: ['./admin.dashboard.component.scss']
})
export class AdminDashboardComponent implements PageComponent {

  constructor() {}

  readonly menuItems: MenuItems = new Menu()
    .withPage(AdminPagesResolver.library())
    .withPage(AdminPagesResolver.editorialBoard())
    .withPage(AdminPagesResolver.scientificBoard())
    .withPage(AdminPagesResolver.reviewers())
    .items;

  observeContentLoading(): Observable<boolean> {
    return of(false);
  }

  observePageName(): Observable<string> {
    return of(AdminPagesResolver.dashboard().title);
  }

  composeLink(url: string): string {
    return RoutesComposer.composeAdminRouterLink(url);
  }

}
