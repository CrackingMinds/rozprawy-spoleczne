import { Component, OnDestroy, OnInit, Inject } from '@angular/core';

import { Observable, Subject, of, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { firstFalse } from 'app/shared/custom.operators';

import { PageComponent } from 'app/client/pages/page.component';

import { IndexingInfo, IndexingInfoItem } from 'app/models/indexing';

import { INDEXING_INFO_ENDPOINT, IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-indexing',
  templateUrl: './indexing.component.html'
})
export class IndexingComponent extends PageComponent implements OnInit, OnDestroy {

  indexingInfo: IndexingInfo;

  private readonly indexingInfoLoading$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(@Inject(INDEXING_INFO_ENDPOINT) private readonly indexingInfoEndpoint: IndexingInfoEndpoint) { super(); }

  ngOnInit() {

    this.indexingInfoEndpoint.getIndexingInfo()
        .pipe(
          map((indexingInfo: IndexingInfo) => {
            return indexingInfo.filter((item: IndexingInfoItem) => item.name !== 'ISSN');
          }),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((indexingInfo: IndexingInfo) => {
          this.indexingInfo = indexingInfo;
          this.indexingInfoLoading$.next(false);
        });
  }

  ngOnDestroy() {
    this.indexingInfoLoading$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observePageLoaded(): Observable<void> {
    return this.indexingInfoLoading$.asObservable().pipe(firstFalse());
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.indexing());
  }

}
