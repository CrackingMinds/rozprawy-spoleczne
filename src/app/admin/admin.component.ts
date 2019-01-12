import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';

@Component({
  selector: 'rs-admin',
  template: `
    <div class="rs-admin-header">
        <button mat-raised-button color="primary" (click)="logOut()">Wyloguj</button>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private firebaseAuth: AngularFireAuth,
              private router: Router) {}

  logOut(): void {
    this.firebaseAuth.auth.signOut();
    this.router.navigateByUrl(`/${RoutesResolver.signIn()}`);
  }
}
