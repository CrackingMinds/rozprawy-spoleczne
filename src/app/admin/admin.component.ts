import { Component } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'rs-admin',
  template: `
    <button (click)="logOut()">Wyloguj</button>
    <router-outlet></router-outlet>
  `
})
export class AdminComponent {

  constructor(private firebaseAuth: AngularFireAuth) {}

  logOut(): void {
    this.firebaseAuth.auth.signOut();
  }
}
