import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Actions, Effect } from '@ngrx/effects';

import { LOAD_CONTACT_INFO, LoadContactInfoFail, LoadContactInfoSuccess } from 'app/store/actions/contact.info.actions';

import { ContactDataService } from 'app/pages/contact-data/contact.data.service';
import { IContactData } from 'app/models/contact-data';

@Injectable()
export class ContactInfoEffects {

  constructor(private actions$: Actions,
              private contactInfoService: ContactDataService) {}

  @Effect()
  loadContactInfo$ = this.actions$.ofType(LOAD_CONTACT_INFO)
    .pipe(
      switchMap(() => {
        return this.contactInfoService.getContactInfo()
          .pipe(
            map((contactInfo: IContactData) => new LoadContactInfoSuccess(contactInfo)),
            catchError(error => of(new LoadContactInfoFail(error)))
          )
      })
    );
}
