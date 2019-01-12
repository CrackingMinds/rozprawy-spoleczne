import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map, first} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { User } from 'firebase';
import { AngularFireAuth} from 'angularfire2/auth';

import { SignInRepository } from 'app/auth/signin/signin.repository';
import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router,
              private signInRepository: SignInRepository) {}

  canActivate(): Observable<boolean> {
    return this.angularFireAuth.authState
      .pipe(
        first(),
        map((user: User) => {

          if (user) {
            return true;
          } else {
            this.redirectToSignIn();
            return false;
          }

        })
      );
  }

  private redirectToSignIn(): void {
    this.signInRepository.redirectedFrom = window.location.pathname;
    this.router.navigateByUrl(`/${RoutesResolver.signIn()}`);
  }
}
