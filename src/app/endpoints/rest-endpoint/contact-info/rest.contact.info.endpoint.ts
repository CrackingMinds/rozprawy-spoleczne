import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ENDPOINT_URL } from 'app/endpoints/endpoint.tokens';

import { IContactInfo } from 'app/models/contact-info';
import { ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';

@Injectable()
export class RestContactInfoEndpoint extends ContactInfoEndpoint {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) {
    super();
  }

  getContactInfo(): Observable<IContactInfo> {
    return this.http.get<IContactInfo>(this.endpointUrl + '/contact-info');
  }

}
