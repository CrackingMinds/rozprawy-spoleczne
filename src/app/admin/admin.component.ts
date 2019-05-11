import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { filter, first, map, takeUntil } from 'rxjs/operators';

import { withMinDuration } from 'app/shared/custom.operators';

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
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit, OnDestroy {

  pageName: string;
  pageLoading: boolean = true;

  viewingAsAnonymous: boolean = false;
  showBackToDashboardLink: boolean = false;

  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private firebaseAuth: AngularFireAuth,
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

    page.observePageLoaded()
        .pipe(
          withMinDuration(),
          first()
        )
        .subscribe(() => this.pageLoading = false);

    this.showBackToDashboardLink = !page.isDashboard();
  }

  onDeactivate(page: AdminPageComponent): void {
    this.pageLoading = true;
  }

  composeDashboardLink(): string {
    return this.composeLink(AdminRoutesResolver.dashboard());
  }

  private composeLink(url: string): string {
    return RoutesComposer.composeAdminRouterLink(url);
  }

}
