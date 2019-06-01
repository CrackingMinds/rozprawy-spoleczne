import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { ContactInfo, ContactInfoEntity } from 'app/models/contact-info';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';
import { ContactInfoEndpoint } from 'app/endpoints/endpoint/contact-info/contact.info.endpoint';

@Injectable()
export class FirestoreContactInfoEndpoint extends FirestoreEndpoint<ContactInfoEntity> implements ContactInfoEndpoint {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  getContactInfo(): Observable<ContactInfo> {
    return this.fetchData()
               .pipe(
                 map((data: Array<ContactInfo>) => data[0])
               );
  }

  protected getCollectionName(): string {
    return 'contact-info';
  }

}
