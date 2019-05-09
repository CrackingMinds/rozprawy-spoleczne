import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { first, takeUntil, filter, map } from 'rxjs/operators';

import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';
import { AdminPageComponent } from 'app/admin/pages/admin.page.component';
import { PageNameService } from 'app/shared/services/page.name.service';
import { RoutesComposer } from 'app/shared/routing-helpers/routes.composer';
import { AdminRoutesResolver } from 'app/shared/routing-helpers/admin.routes.resolver';

@Component({
  selector: 'rs-admin',
  templateUrl: `./admin.component.html`,
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  pageName: string;

  viewingAsAnonymous: boolean = false;

  showBackToDashboardLink: boolean = false;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private firebaseAuth: AngularFireAuth,
              private router: Router,
              private pageNameService: PageNameService) {}

  ngOnInit() {
    this.firebaseAuth.user
        .pipe(
          filter((user) => !!user),
          map((user: User) => user.isAnonymous),
          takeUntil(this.destroy$)
        )
      .subscribe((isAnonymous: boolean) => this.viewingAsAnonymous = isAnonymous);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logOut(): void {
    this.firebaseAuth.auth.signOut();
    this.router.navigateByUrl(`/${RoutesResolver.signIn()}`);
  }

  onActivate(page: AdminPageComponent): void {
    page.observePageName()
      .pipe(first())
      .subscribe((name: string) => {
        this.pageName = name;
        this.pageNameService.setPageName(this.pageName);
      });

    this.showBackToDashboardLink = !page.isDashboard();

  }

  composeDashboardLink(): string {
    return this.composeLink(AdminRoutesResolver.dashboard());
  }

  private composeLink(url: string): string {
    return RoutesComposer.composeAdminRouterLink(url);
  }

}
