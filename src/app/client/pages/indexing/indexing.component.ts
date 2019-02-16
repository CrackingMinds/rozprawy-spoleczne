import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PageComponent } from 'app/client/pages/page.component';

import { IIndexingInfo } from 'app/models/indexing-info';

import { IndexingInfoEndpoint } from 'app/endpoints/endpoint/indexing-info/indexing.info.endpoint';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-indexing',
  templateUrl: './indexing.component.html'
})
export class IndexingComponent extends PageComponent implements OnInit, OnDestroy {

  indexingData: IIndexingInfo[];
  indexingDataToShow: IIndexingInfo[];

  private indexingInfoLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private indexingInfoEndpoint: IndexingInfoEndpoint) { super(); }

  ngOnInit() {

    this.indexingInfoEndpoint.getIndexingInfo()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res: IIndexingInfo[]) => {
          this.indexingData = res;

          this.indexingDataToShow = this.indexingData.filter((data) => {
            return data.name !== 'ISSN';
          });

          this.indexingInfoLoaded$.next();
        });
  }

  ngOnDestroy() {
    this.indexingInfoLoaded$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoaded(): Observable<void> {
    return this.indexingInfoLoaded$.asObservable();
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.indexing());
  }

}
