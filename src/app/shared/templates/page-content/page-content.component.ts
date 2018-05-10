import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../../services/spinner/spinner.service";
import {PageNameService} from "../../services/page.name.service";

@Component({
    selector: 'page-content',
    templateUrl: './page-content.component.html'
})
export class PageContentComponent implements OnInit {
    spinnerServiceObj: SpinnerService;
    pageName: string;
    linkedInProfileLink = 'https://www.linkedin.com/in/viacheslav-guselnykov-13b25b15a/';


    constructor(
        private spinnerService: SpinnerService,
        private pageNameService: PageNameService
    ) {
    }

    ngOnInit() {
        this.spinnerServiceObj = this.spinnerService;
        let self = this;
        this.pageNameService.pageName
            .subscribe(function (pageName: string) {
                self.pageName = pageName;
            })
    }
}
