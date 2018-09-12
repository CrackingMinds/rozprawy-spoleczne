import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { IndexingData } from 'app/models/interfaces';

import { IndexingService } from 'app/pages/indexing/indexing.service';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
    selector: 'indexing',
    templateUrl: './indexing.component.html'
})
export class IndexingComponent implements OnInit, OnDestroy {
    indexingData: IndexingData[];
    indexingDataToShow: IndexingData[];

    private subscriptions = new Subscription();

    constructor(private indexingService: IndexingService,
                private basicWrapperService: BasicWrapperService,
                private pageNameService: PageNameService) {}

    ngOnInit() {
      this.pageNameService.setPageName('Bazy indeksacyjne');

      this.subscriptions.add(
          this.indexingService.getIndexingInfo()
              .subscribe((res: IndexingData[]) => {
                this.indexingData = res;

                this.indexingDataToShow = this.indexingData.filter(function (data) {
                  return data.name !== 'ISSN';
                });

                this.basicWrapperService.contentLoaded();
              })
      );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}
