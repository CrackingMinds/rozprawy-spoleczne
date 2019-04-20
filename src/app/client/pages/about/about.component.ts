import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';

import { PageComponent } from 'app/client/pages/page.component';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-about',
  templateUrl: './about.component.html'
})
export class AboutComponent extends PageComponent {

  constructor() { super(); }

  observeContentLoading(): Observable<boolean> {
    return of(false);
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.about());
  }

}
