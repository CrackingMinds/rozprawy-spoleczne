import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { IIndexingInfo } from 'app/models/indexing-info';

import { IndexingInfoService } from 'app/services/endpoint/indexing-info/indexing.info.service';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
    selector: 'indexing',
    templateUrl: './indexing.component.html'
})
export class IndexingComponent implements OnInit, OnDestroy {
    indexingData: IIndexingInfo[];
    indexingDataToShow: IIndexingInfo[];

    private subscriptions = new Subscription();

    constructor(private indexingService: IndexingInfoService,
                private basicWrapperService: BasicWrapperService,
                private pageNameService: PageNameService) {}

    ngOnInit() {
      this.pageNameService.setPageName('Bazy indeksacyjne');

      this.subscriptions.add(
          this.indexingService.fetchIndexingInfo()
              .subscribe((res: IIndexingInfo[]) => {
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
