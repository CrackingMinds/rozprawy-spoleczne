import { InjectionToken } from '@angular/core';

import { Observable } from 'rxjs';

import { ContactInfo } from 'app/models/contact-info';

export const CONTACT_INFO_ENDPOINT = new InjectionToken<ContactInfoEndpoint>('CONTACT_INFO_ENDPOINT');

export interface ContactInfoEndpoint {

  getContactInfo(): Observable<ContactInfo>;

}
