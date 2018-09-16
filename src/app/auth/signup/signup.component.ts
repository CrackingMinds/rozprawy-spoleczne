import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import UserCredential = firebase.auth.UserCredential;

import { Users } from 'app/models/Users';

import { PageNameService } from 'app/shared/services/page.name.service';

import { fallIn, moveIn } from 'app/auth/auth.animations';

const usersCollectionName: string = 'users';

@Component({
    selector: 'sign-up',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [moveIn(), fallIn()],
    host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;

  usersCol: AngularFirestoreCollection<Users>;

  constructor(private angularFireAuth: AngularFireAuth,
              private angularFirestore: AngularFirestore,
              private router: Router,
              private pageNameService: PageNameService) {

    this.angularFireAuth.authState.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/admin/dashboard');
      }
    });

  }

  ngOnInit() {
    this.pageNameService.setPageName('Rejestracja');
    this.usersCol = this.angularFirestore.collection(usersCollectionName);
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (userCredentials: UserCredential) => {
          let user: Users = {
            userId: userCredentials.user.uid,
            firstName: formData.value.firstName
          };
          this.saveUserDataToDb(user).then(
            () => {
              this.router.navigateByUrl('/admin/dashboard');
            }
          ).catch(
            (err) => {
              this.error = err;
            }
          );
        }
      ).catch(
        (err) => {
          this.error = err;
        }
      )
    }
  }

  private saveUserDataToDb(userData: Users): Promise<any> {
    return this.angularFirestore.collection(usersCollectionName).add(userData);
  }

}
