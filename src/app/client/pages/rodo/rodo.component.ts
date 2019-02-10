import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Page } from 'app/client/pages/page';

@Component({
	selector: 'rs-rodo',
	templateUrl: `./rodo.component.html`,
  styleUrls: ['./rodo.component.scss']
})
export class RODOComponent extends Page {

	constructor() { super(); }

  observeContentLoaded(): Observable<void> {
    return of(null);
  }

  observePageName(): Observable<string> {
    return of('RODO');
  }

}
