import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { PageNameService } from 'app/shared/services/page.name.service';
import { AdminRoutesResolver } from 'app/routes-resolver/admin.routes.resolver';

enum LoginErrorType {
  EMAIL,
  PASSWORD
}

const emailRegExp: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

@Component({
  selector: 'rs-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  form: FormGroup = this.formBuilder.group({
    email: [undefined, [
      Validators.required,
      Validators.pattern(emailRegExp)
    ]],
    password: [undefined, Validators.required]
  });

  loginError: { type: LoginErrorType; message: string };

  showLoginSpinner: boolean = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router,
              private formBuilder: FormBuilder,
              private pageNameService: PageNameService) {}

  ngOnInit() {
    this.angularFireAuth.authState
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((user: User) => {
          user && this.router.navigateByUrl(`/${AdminRoutesResolver.admin}`);
        });
    this.pageNameService.setPageName('Zalogowanie');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(): void {

    this.showLoginSpinner = true;

    const email: string = this.form.value.email;
    const password: string = this.form.value.password;

    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      // this.router.navigateByUrl('/admin/dashboard');

      this.showLoginSpinner = false;
    }).catch((err) => {
      this.showErrorMessageBasedOnCode(err.code);

      this.showLoginSpinner = false;
    });
  }

  removeErrorMessage(): void {

    if (!this.loginError)
      return;

    this.loginError = null;
  }

  private showErrorMessageBasedOnCode(errorCode: string): void {

    switch (errorCode) {

      case 'auth/invalid-email': {
        this.loginError = {
          type: LoginErrorType.EMAIL,
          message: 'Błąd w adresie email'
        };
        break;
      }

      case 'auth/user-disabled': {
        this.loginError = {
          type: LoginErrorType.EMAIL,
          message: 'Użytkownik o podanym adresie email jest zdeaktywowany'
        };
        break;
      }

      case 'auth/user-not-found': {
        this.loginError = {
          type: LoginErrorType.EMAIL,
          message: 'Użytkownik o podanym adresie email nie istnieje (sprawdż czy podany email jest poprawny)'
        };
        break;
      }

      case 'auth/wrong-password': {
        this.loginError = {
          type: LoginErrorType.PASSWORD,
          message: 'Niepoprawne hasło'
        };
        break;
      }
    }
  }

}
