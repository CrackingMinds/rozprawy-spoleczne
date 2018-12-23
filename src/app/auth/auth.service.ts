import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ENDPOINT_URL } from 'app/services/endpoint/endpoint.services.tokens';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) {}

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.endpointUrl + '/sign-up', user, { headers: headers});
  }

  authenticateUser(user) {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post(this.endpointUrl + '/sign-in', user, { headers: headers});
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
