import {Component, OnInit} from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {SpinnerService} from "../../../services/spinner/spinner.service";
import {IndexingService} from '../../../pages/indexing/indexing.service';
import {IIndexing} from "../../../models/indexing";

@Component({
    selector: 'journal-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    indexing: IIndexing[];

    constructor(private indexingService: IndexingService) {
    }

    ngOnInit() {
        this.getIndexingInfo();
        // this.spinnerService.initializeSpinner(this.getIndexingInfo());

        // this.indexing.push(this.infoGeneral.indexing.mnisw);
        // this.indexing.push(this.infoGeneral.indexing.icv);
        // this.indexing.push(this.infoGeneral.indexing.issn);
    }

    getIndexingInfo(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.indexingService.getIndexingInfo()
                .subscribe((res) => {
                    self.indexing = res;
                    resolve();
                });
        });
    }
}
