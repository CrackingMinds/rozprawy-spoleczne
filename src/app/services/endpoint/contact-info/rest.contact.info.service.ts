import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ENDPOINT_URL } from 'app/services/endpoint/endpoint.services.tokens';

import { IContactInfo } from 'app/models/contact-info';
import { ContactInfoService } from 'app/services/endpoint/contact-info/contact.info.service';

@Injectable()
export class RestContactInfoService extends ContactInfoService {

  constructor(@Inject(ENDPOINT_URL) private endpointUrl: string,
              private http: HttpClient) {
    super();
  }

  fetchContactInfo(): Observable<IContactInfo> {
    return this.http.get<IContactInfo>(this.endpointUrl + '/contact-info');
  }

}
