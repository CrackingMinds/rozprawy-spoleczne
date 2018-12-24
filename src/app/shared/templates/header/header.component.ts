import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IIndexingInfo } from 'app/models/indexing-info';
import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';
import { AsyncComponent } from 'app/pages/async.component';

@Component({
  selector: 'rs-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements AsyncComponent, OnInit, OnDestroy {

  indexingInfo: IIndexingInfo[];

  private contentLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private indexingInfoEndpoint: IndexingInfoEndpoint) {}

  ngOnInit() {
    this.indexingInfoEndpoint.getIndexingInfo()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: IIndexingInfo[]) => {
          this.indexingInfo = data;
          this.contentLoaded$.next();
        });
  }

  ngOnDestroy() {
    this.contentLoaded$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoaded(): Observable<void> {
    return this.contentLoaded$.asObservable();
  }

}
