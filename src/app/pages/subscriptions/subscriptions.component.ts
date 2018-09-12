import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ISubsriptionsInfo } from 'app/models/subscriptions';

import { SubscriptionsService } from 'app/pages/subscriptions/subscriptions.service';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
    selector: 'subscriptions',
    templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent implements OnInit, OnDestroy {
    subscriptionsInfo: ISubsriptionsInfo;
    dataLoaded: boolean = false;

    private subscriptions = new Subscription();

    constructor(private subscriptionsService: SubscriptionsService,
                private basicWrapperService: BasicWrapperService,
                private pageNameService: PageNameService) {}

    ngOnInit() {
      this.pageNameService.setPageName('Prenumerata');

      this.subscriptions.add(
        this.subscriptionsService.getSubscriptionsInfo()
            .subscribe((res: ISubsriptionsInfo) => {
              this.subscriptionsInfo = res;
              this.dataLoaded = true;

              this.basicWrapperService.contentLoaded();
            })
      );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}
