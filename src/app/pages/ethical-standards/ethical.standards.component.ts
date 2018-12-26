import { Component } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Page } from 'app/pages/page';

@Component({
  selector: 'rs-ethical-standards',
  templateUrl: './ethical.standards.component.html',
  styleUrls: ['./ethical.standards.component.scss']
})
export class EthicalStandardsComponent extends Page {

  constructor() { super(); }

  observeContentLoaded(): Observable<void> {
    return of(null);
  }

  observePageName(): Observable<string> {
    return of('Standardy etyczne');
  }

}
