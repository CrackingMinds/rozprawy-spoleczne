import { Injectable } from '@angular/core';
import {ApiService} from "../services/api.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService extends ApiService{
  authToken: any;
  user: any;
  constructor(private http: HttpClient) { super(); }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.backendUrl + '/sign-up', user, { headers: headers});
  }

  authenticateUser(user) {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post(this.backendUrl + '/sign-in', user, { headers: headers});
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    // return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
