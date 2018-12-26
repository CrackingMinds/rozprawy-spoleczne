import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'rs-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    email: [undefined, Validators.required],
    password: [undefined, Validators.required]
  });

  loginError: string;

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router,
              private formBuilder: FormBuilder) {

    this.angularFireAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/admin/dashboard');
      }
    });
  }

  ngOnInit() {
    // this.pageNameService.setPageName('Logowanie');
  }

  onSubmit(): void {
    const email: string = this.form.value.email;
    const password: string = this.form.value.password;

    // TODO: Validate email and password
    return;

    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then(
      () => {
        // this.router.navigateByUrl('/admin/dashboard');
      }
    ).catch(
      (err) => {
        this.loginError = err;
      }
    );
  }
}
