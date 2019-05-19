import { Component, OnDestroy, OnInit, Inject } from '@angular/core';

import { Subject, Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { firstFalse } from 'app/shared/custom.operators';

import { IndexingInfo } from 'app/models/indexing';

import { INDEXING_INFO_ENDPOINT, IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';
import { AsyncComponent } from 'app/client/pages/async.component';

@Component({
  selector: 'rs-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AsyncComponent, OnInit, OnDestroy {

  indexingInfo: IndexingInfo;

  private readonly contentLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(@Inject(INDEXING_INFO_ENDPOINT) private indexingInfoEndpoint: IndexingInfoEndpoint) {}

  ngOnInit() {
    this.indexingInfoEndpoint.getIndexingInfo()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((indexingInfo: IndexingInfo) => {
          this.indexingInfo = indexingInfo;
          this.contentLoading$.next(false);
        });
  }

  ngOnDestroy() {
    this.contentLoading$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observePageLoaded(): Observable<void> {
    return this.contentLoading$.asObservable().pipe(firstFalse());
  }

}
