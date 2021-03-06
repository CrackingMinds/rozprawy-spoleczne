import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';

import { PageComponent } from 'app/client/pages/page.component';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
	selector: 'rs-rodo',
	templateUrl: `./rodo.component.html`,
  styleUrls: ['./rodo.component.scss']
})
export class RODOComponent extends PageComponent {

	constructor() { super(); }

  observePageLoaded(): Observable<void> {
    return of(null);
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.rodo());
  }

}
