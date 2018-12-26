import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map, first} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth} from 'angularfire2/auth';
import { User } from 'firebase';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.angularFireAuth.authState
      .pipe(
        first(),
        map((user: User) => {

          if (user) {
            return true;
          } else {
            this.router.navigate(['/sign-in']);
            return false;
          }

        })
      );
  }
}
