import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PageLoadSpinnerService } from 'app/page-load-spinner/page.load.spinner.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rs-page-load-spinner',
  templateUrl: './page.load.spinner.component.html',
  styleUrls: ['./page.load.spinner.component.scss']
})
export class PageLoadSpinnerComponent implements OnInit, OnDestroy {

  spinnerShown: Observable<boolean>;

  private subscriptions = new Subscription();

  constructor(private pageLoadSpinnerService: PageLoadSpinnerService) {}

  ngOnInit() {
    this.spinnerShown = this.pageLoadSpinnerService.observeSpinnerStateChange();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
