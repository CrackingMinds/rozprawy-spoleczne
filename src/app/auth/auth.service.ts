import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {ApiService} from "../services/api.service";
import {tokenNotExpired} from "angular2-jwt";

@Injectable()
export class AuthService extends ApiService{
  authToken: any;
  user: any;
  constructor(private http: Http) { super(); }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.backendUrl + '/sign-up', user, { headers: headers})
        .map(res => res.json());
  }

  authenticateUser(user) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post(this.backendUrl + '/sign-in', user, { headers: headers})
          .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
