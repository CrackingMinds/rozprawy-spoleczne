import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../services/spinner/spinner.service";
import {PageNameService} from "../../shared/services/page.name.service";
import {PageBase} from "../../shared/page.base";

@Component({
    selector: 'about',
    templateUrl: './about.component.html'
})
export class AboutComponent extends PageBase implements OnInit {

    constructor(private spinnerService: SpinnerService,
                private pageNameService: PageNameService) {
        super(
            spinnerService,
            pageNameService
        );
    }

    ngOnInit() {
        if (!this.spinnerService.getState()) {
            this.spinnerService.showSpinner();
        }

        this.asyncAction = this.asyncPlaceholder();
        let self = this;
        this.asyncAction
            .then(function () {
                self.changePageName('O czasopiśmie');
            });
        super.ngOnInit();
    }

    asyncPlaceholder(): Promise<any> {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, 1000);
        });
    }

}
