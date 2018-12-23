import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IIndexingInfo } from 'app/models/indexing-info';
import { IndexingInfoService } from 'app/services/endpoint/indexing-info/indexing.info.service';

@Component({
    selector: 'rs-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    indexingInfo: IIndexingInfo[];

    private unsubscribe$: Subject<void> = new Subject<void>();

    constructor(private indexingInfoService: IndexingInfoService) {}

    ngOnInit() {
      this.indexingInfoService.fetchIndexingInfo()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: IIndexingInfo[]) => {
          this.indexingInfo = data;
        });
    }

    ngOnDestroy() {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }

}
