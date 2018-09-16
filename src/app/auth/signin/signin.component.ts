import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';

import { fallIn, moveIn } from 'app/auth/auth.animations';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
    selector: 'sign-in',
    templateUrl: './signin.component.html',
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class SigninComponent implements OnInit {
    state: string = '';
    error: any;

    constructor(private angularFireAuth: AngularFireAuth,
                private router: Router,
                private pageNameService: PageNameService) {

      this.angularFireAuth.authState.subscribe(auth => {
        if(auth) {
          this.router.navigateByUrl('/admin/dashboard');
        }
      });
    }

    ngOnInit() {
      this.pageNameService.setPageName('Logowanie');
    }

    onSubmit(formData) {
      if (formData.valid) {
        this.angularFireAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(
          (success) => {
            this.router.navigateByUrl('/admin/dashboard');
          }
        ).catch(
          (err) => {
            this.error = err;
          }
        )
      }
    }
}
