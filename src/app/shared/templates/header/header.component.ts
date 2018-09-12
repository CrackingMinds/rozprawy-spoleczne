import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { IIndexing } from 'app/models/indexing';

import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';
import { IndexingService } from 'app/pages/indexing/indexing.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'rs-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    indexing: IIndexing[];

    private subscriptions = new Subscription();

    constructor(private indexingService: IndexingService,
                private basicWrapperService: BasicWrapperService) {
    }

    ngOnInit() {
      this.subscriptions.add(
        this.indexingService.getIndexingInfo()
            .pipe(take(1))
            .subscribe((res: IIndexing[]) => {
              this.indexing = res;
              this.basicWrapperService.headerLoaded();
            })
      );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}
