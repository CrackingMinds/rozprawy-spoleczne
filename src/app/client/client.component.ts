import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { PageNameService } from 'app/shared/services/page.name.service';

import { ClientPageState, getClientPageContactInfoLoading, getClientPageIndexingInfoLoading } from 'app/client/store/client.page.reducers';
import { ClientContentService } from 'app/client/client.content.service';

@Component({
  selector: 'rs-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  linkedInProfileLink = 'https://www.linkedin.com/in/viacheslav-guselnykov-13b25b15a/';

  contactInfoLoading$: Observable<boolean>;
  indexingInfoLoading$: Observable<boolean>;
  contentLoading$: Observable<boolean>;

  pageName: Observable<string>;

  constructor(private store: Store<ClientPageState>,
              private pageNameService: PageNameService,
              private clientContentService: ClientContentService) {}

  ngOnInit() {
    this.pageName = this.pageNameService.observePageName();

    this.contactInfoLoading$ = this.store.select(getClientPageContactInfoLoading);
    this.indexingInfoLoading$ = this.store.select(getClientPageIndexingInfoLoading);

    this.contentLoading$ = zip(
      this.contactInfoLoading$,
      this.indexingInfoLoading$,
      this.clientContentService.observeContentLoading()
    ).pipe(
      map((contentLoading: boolean[]) => {
        const contactInfoLoading = contentLoading[0];
        const indexingInfoLoading = contentLoading[1];
        const nestedContentLoading = contentLoading[2];
        return contactInfoLoading && indexingInfoLoading && nestedContentLoading;
      })
    );
  }

  ngOnDestroy() {
    this.clientContentService.destroy();
  }

}
