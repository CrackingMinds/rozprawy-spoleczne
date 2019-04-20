import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IIndexingInfo } from 'app/models/indexing-info';
import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';
import { AsyncComponent } from 'app/client/pages/async.component';

@Component({
  selector: 'rs-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AsyncComponent, OnInit, OnDestroy {

  indexingInfo: IIndexingInfo[];

  private readonly contentLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private indexingInfoEndpoint: IndexingInfoEndpoint) {}

  ngOnInit() {
    this.indexingInfoEndpoint.getIndexingInfo()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: IIndexingInfo[]) => {
          this.indexingInfo = data;
          this.contentLoading$.next(false);
        });
  }

  ngOnDestroy() {
    this.contentLoading$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoading(): Observable<boolean> {
    return this.contentLoading$.asObservable();
  }

}
