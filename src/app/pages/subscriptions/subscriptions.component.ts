import {Component, OnInit} from '@angular/core';
import {SubscriptionsService} from "./subscriptions.service";
import {SpinnerService} from "../../services/spinner/spinner.service";
import {ISubsriptionsInfo} from "../../models/subscriptions";
import {PageBase} from "../../shared/page.base";
import {PageNameService} from "../../shared/services/page.name.service";

@Component({
    selector: 'subscriptions',
    templateUrl: './subscriptions.component.html'
})
export class SubscriptionsComponent extends PageBase implements OnInit {
    subscriptionsInfo: ISubsriptionsInfo;
    dataLoaded: boolean = false;

    constructor(private subscriptionsService: SubscriptionsService,
                private spinnerService: SpinnerService,
                private pageNameService: PageNameService) {
        super(
            spinnerService,
            pageNameService
        );
    }

    ngOnInit() {
        this.asyncAction = this.getSubscriptionsData();
        let self = this;
        this.asyncAction
            .then(function () {
                self.changePageName('Prenumerata');
            });
        super.ngOnInit();
    }

    getSubscriptionsData(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.subscriptionsService.getSubscriptionsInfo()
                .subscribe((res) => {
                    self.subscriptionsInfo = res;
                    self.dataLoaded = true;
                    resolve();
                });
        });
    }

}
