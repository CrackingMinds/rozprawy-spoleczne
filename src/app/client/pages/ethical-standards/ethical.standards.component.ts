import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';

import { PageComponent } from 'app/client/pages/page.component';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-ethical-standards',
  templateUrl: './ethical.standards.component.html',
  styleUrls: ['./ethical.standards.component.scss']
})
export class EthicalStandardsComponent extends PageComponent {

  constructor() { super(); }

  observePageLoaded(): Observable<void> {
    return of(null);
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.ethicsStatement());
  }

}
