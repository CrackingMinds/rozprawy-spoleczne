import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Page } from 'app/pages/page';

@Component({
  selector: 'rs-about',
  templateUrl: './about.component.html'
})
export class AboutComponent extends Page {

  constructor() { super(); }

  observeContentLoaded(): Observable<void> {
    return of(null);
  }

  observePageName(): Observable<string> {
    return of('O czasopiśmie');
  }

}
