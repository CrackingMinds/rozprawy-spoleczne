import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ISubsriptionsInfo } from 'app/models/subscriptions';

import { SubscriptionsEndpoint } from 'app/endpoints/endpoint/subscriptions/subscriptions.endpoint';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
    selector: 'subscriptions',
    templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent implements OnInit, OnDestroy {
    subscriptionsInfo: ISubsriptionsInfo;
    dataLoaded: boolean = false;

    private subscriptions = new Subscription();

    constructor(private subscriptionsEndpoint: SubscriptionsEndpoint,
                private pageNameService: PageNameService) {}

    ngOnInit() {
      this.pageNameService.setPageName('Prenumerata');

      this.subscriptions.add(
        this.subscriptionsEndpoint.getSubscriptionsInfo()
            .subscribe((res: ISubsriptionsInfo) => {
              this.subscriptionsInfo = res;
              this.dataLoaded = true;
            })
      );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }
}
