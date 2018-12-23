import { IContactInfo } from 'app/models/contact-info';

import { Observable } from 'rxjs';

export abstract class ContactInfoService {

    abstract fetchContactInfo(): Observable<IContactInfo>;

}
