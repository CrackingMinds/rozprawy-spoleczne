import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { AngularFireAuth } from 'angularfire2/auth';

import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';
import { PageComponent } from 'app/client/pages/page.component';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
  selector: 'rs-admin',
  template: `
    <div class="rs-admin-header">
        <button mat-raised-button color="primary" (click)="logOut()">Wyloguj</button>
    </div>
    <div class="rs-page-header">
      <h3 class="rs-page-title">{{ pageName }}</h3>
    </div>
    <router-outlet
      (activate)="onActivate($event)">
    </router-outlet>
  `,
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  pageName: string;

  constructor(private firebaseAuth: AngularFireAuth,
              private router: Router,
              private pageNameService: PageNameService) {}

  logOut(): void {
    this.firebaseAuth.auth.signOut();
    this.router.navigateByUrl(`/${RoutesResolver.signIn()}`);
  }

  onActivate(page: PageComponent): void {
    page.observePageName()
      .pipe(first())
      .subscribe((name: string) => {
        this.pageName = name;
        this.pageNameService.setPageName(this.pageName);
      });

  }

}
