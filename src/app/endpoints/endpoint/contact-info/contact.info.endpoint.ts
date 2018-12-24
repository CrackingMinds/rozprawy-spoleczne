import { IContactInfo } from 'app/models/contact-info';

import { Observable } from 'rxjs';

export abstract class ContactInfoEndpoint {

  abstract getContactInfo(): Observable<IContactInfo>;

}
