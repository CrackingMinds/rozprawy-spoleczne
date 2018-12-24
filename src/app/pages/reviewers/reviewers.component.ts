import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ReviewersEndpoint } from 'app/endpoints/endpoint/reviewers/reviewers.endpoint';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
    selector: 'reviewers',
    templateUrl: './reviewers.component.html'
})
export class ReviewersComponent implements OnInit, OnDestroy {
    reviewersData: any;

    private subscriptions = new Subscription();

    constructor(private reviewersEndpoint: ReviewersEndpoint,
                private pageNameService: PageNameService) {}

    ngOnInit() {
      this.pageNameService.setPageName('Recenzenci');

      this.subscriptions.add(
        this.reviewersEndpoint.getReviewers()
            .subscribe(data => {
              this.reviewersData = data;
            })
      );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }

}
