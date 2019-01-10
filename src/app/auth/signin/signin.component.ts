import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { AngularFireAuth } from 'angularfire2/auth';

import { PageNameService } from 'app/shared/services/page.name.service';
import { AdminRoutesResolver } from 'app/routes-resolver/admin.routes.resolver';
import { SignInRepository } from 'app/auth/signin/signin.repository';
import { CustomValidators } from 'app/shared/services/custom.validators';

enum LoginErrorType {
  EMAIL,
  PASSWORD
}

@Component({
  selector: 'rs-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  form: FormGroup = this.formBuilder.group({
    email: [undefined, [
      Validators.required,
      Validators.pattern(
        CustomValidators.fullMatch(CustomValidators.email)
      )
    ]],
    password: [undefined, Validators.required]
  });

  loginError: { type: LoginErrorType; message: string };

  showLoginSpinner: boolean = false;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router,
              private formBuilder: FormBuilder,
              private pageNameService: PageNameService,
              private signInRepository: SignInRepository) {}

  ngOnInit() {
    this.pageNameService.setPageName('Zalogowanie');
  }

  ngOnDestroy() {
    this.signInRepository.reset();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit(): void {

    this.showLoginSpinner = true;

    const email: string = this.form.value.email;
    const password: string = this.form.value.password;

    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then(() => {

      if (this.signInRepository.redirectedFrom) {
        this.redirectToPreviousPage();
      } else {
        this.redirectToAdminPage();
      }

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

  private redirectToPreviousPage(): void {
    this.router.navigateByUrl(this.signInRepository.redirectedFrom);
  }

  private redirectToAdminPage(): void {
    this.router.navigateByUrl(`/${AdminRoutesResolver.admin}`);
  }

}
