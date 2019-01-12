import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { AdminRoutesResolver } from 'app/shared/routing-helpers/admin.routes.resolver';

@Injectable()
export class SigninGuard implements CanActivate {

	constructor(private angularFireAuth: AngularFireAuth,
              private router: Router) {}

  canActivate(): Observable<boolean> {
	  return this.angularFireAuth.authState
      .pipe(
        first(),
        map((user: User) => {

          if (user) {
            this.redirectToAdminPage();
            return false;
          } else {
            return true;
          }

        })
      );
  }

  private redirectToAdminPage(): void {
    this.router.navigateByUrl(`/${AdminRoutesResolver.admin()}`);
  }

}
