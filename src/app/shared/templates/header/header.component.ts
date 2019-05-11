import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Observable, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { firstFalse } from 'app/shared/custom.operators';

import { IndexingInfo } from 'app/models/indexing';

import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';
import { AsyncComponent } from 'app/client/pages/async.component';
import { CustomSorting } from 'app/shared/custom.sorting';

@Component({
  selector: 'rs-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AsyncComponent, OnInit, OnDestroy {

  indexingInfo: IndexingInfo;

  private readonly contentLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private indexingInfoEndpoint: IndexingInfoEndpoint) {}

  ngOnInit() {
    this.indexingInfoEndpoint.getIndexingInfo()
        .pipe(
          map((indexingInfo: IndexingInfo) => [...indexingInfo].sort(CustomSorting.byCustomOrder)),
          takeUntil(this.unsubscribe$)
        )
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
