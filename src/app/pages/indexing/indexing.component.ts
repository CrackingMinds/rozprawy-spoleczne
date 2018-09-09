import {Component, OnInit} from '@angular/core';
import {IndexingService} from "./indexing.service";
import {SpinnerService} from "../../services/spinner/spinner.service";
import {IndexingData} from "../../models/interfaces";
import {PageBase} from "../../shared/page.base";
import {PageNameService} from "../../shared/services/page.name.service";

@Component({
    selector: 'indexing',
    templateUrl: './indexing.component.html'
})
export class IndexingComponent extends PageBase implements OnInit {
    indexingData: IndexingData[];
    indexingDataToShow: IndexingData[];

    constructor(private indexingService: IndexingService,
                private spinnerService: SpinnerService,
                private pageNameService: PageNameService) {
        super(
            spinnerService,
            pageNameService
        );
    }

    ngOnInit() {
        this.asyncAction = this.getIndexingData();
        let self = this;
        this.asyncAction
            .then(function () {
                self.changePageName('Bazy indeksacyjne');
            });
        super.ngOnInit();
    }

    getIndexingData(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.indexingService.getIndexingInfo()
                .subscribe((res: IndexingData[]) => {
                    self.indexingData = res;

                    self.indexingDataToShow = self.indexingData.filter(function (data) {
                        return data.name !== 'ISSN';
                    });

                    resolve();
                });
        });
    }
}
