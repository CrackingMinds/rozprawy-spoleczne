import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../services/spinner/spinner.service";
import {ReviewersService} from "./reviewers.service";
import {PageNameService} from '../../shared/services/page.name.service';
import {PageBase} from "../../shared/page.base";

@Component({
    selector: 'reviewers',
    templateUrl: './reviewers.component.html'
})
export class ReviewersComponent extends PageBase implements OnInit {
    reviewersData: any;

    constructor(private reviewersService: ReviewersService,
                private spinnerService: SpinnerService,
                private pageNameService: PageNameService) {
        super(
            spinnerService,
            pageNameService
        );
    }

    ngOnInit() {
        this.asyncAction = this.getReviewersData();
        let self = this;
        this.asyncAction
            .then(function () {
                self.changePageName('Recenzenci');
            });
        super.ngOnInit();
    }

    protected getReviewersData(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.reviewersService.getReviewers()
                .subscribe(data => {
                    self.reviewersData = data;
                    resolve();
                });
        });
    }

}
