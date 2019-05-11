import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';

import { AdminPageComponent } from 'app/admin/pages/admin.page.component';
import { Menu, MenuItems } from 'app/shared/templates/menu/menu';
import { AdminPagesResolver } from 'app/shared/routing-helpers/admin.pages.resolver';
import { RoutesComposer } from 'app/shared/routing-helpers/routes.composer';

@Component({
  selector: 'rs-admin-dashboard',
  templateUrl: './admin.dashboard.component.html',
  styleUrls: ['./admin.dashboard.component.scss']
})
export class AdminDashboardComponent extends AdminPageComponent {

  constructor() { super(); }

  readonly menuItems: MenuItems = new Menu()
    .withPage(AdminPagesResolver.library())
    .withPage(AdminPagesResolver.editorialBoard())
    .withPage(AdminPagesResolver.scientificBoard())
    .withPage(AdminPagesResolver.reviewers())
    .withPage(AdminPagesResolver.indexing())
    .items;

  observePageName(): Observable<string> {
    return of(AdminPagesResolver.dashboard().title);
  }

  observePageLoaded(): Observable<void> {
    return of(null);
  }

  isDashboard(): boolean {
    return true;
  }

  composeLink(url: string): string {
    return RoutesComposer.composeAdminRouterLink(url);
  }

}
