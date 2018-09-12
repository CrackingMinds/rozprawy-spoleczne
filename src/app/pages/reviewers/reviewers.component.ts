import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ReviewersService } from 'app/pages/reviewers/reviewers.service';
import { PageNameService } from 'app/shared/services/page.name.service';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';

@Component({
    selector: 'reviewers',
    templateUrl: './reviewers.component.html'
})
export class ReviewersComponent implements OnInit, OnDestroy {
    reviewersData: any;

    private subscriptions = new Subscription();

    constructor(private reviewersService: ReviewersService,
                private basicWrapperService: BasicWrapperService,
                private pageNameService: PageNameService) {}

    ngOnInit() {
      this.pageNameService.setPageName('Recenzenci');

      this.subscriptions.add(
        this.reviewersService.getReviewers()
            .subscribe(data => {
              this.reviewersData = data;
              this.basicWrapperService.contentLoaded();
            })
      );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }

}
