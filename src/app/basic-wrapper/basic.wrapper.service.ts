import { Injectable } from '@angular/core';

import { PageLoadSpinnerService } from 'app/page-load-spinner/page.load.spinner.service';
import { Subject } from 'rxjs/Subject';
import { zip } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class BasicWrapperService {

  private headerLoaded$: Subject<void> = new Subject<void>();
  private menuLoaded$: Subject<void> = new Subject<void>();
  private contentLoaded$: Subject<void> = new Subject<void>();

  constructor(private pageLoadSpinnerService: PageLoadSpinnerService) {
    zip(
      this.headerLoaded$,
      this.menuLoaded$,
      this.contentLoaded$
    ).subscribe(() => {
      this.pageLoadSpinnerService.hideSpinner();
    });
  }

  headerLoaded(): void {
    this.headerLoaded$.next();
  }

  menuLoaded(): void {
    this.menuLoaded$.next();
  }

  contentLoaded(): void {
    this.contentLoaded$.next();
  }

}
