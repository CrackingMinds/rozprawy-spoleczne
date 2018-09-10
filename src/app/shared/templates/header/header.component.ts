import {Component, OnInit} from '@angular/core';
import {SpinnerService} from "../../../services/spinner/spinner.service";
import {IndexingService} from '../../../pages/indexing/indexing.service';
import {IIndexing} from "../../../models/indexing";

@Component({
    selector: 'rs-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    indexing: IIndexing[];

    constructor(private indexingService: IndexingService,
                private spinnerService: SpinnerService) {
    }

    ngOnInit() {
        let asyncAction = this.getIndexingInfo();
        this.spinnerService.addHeaderLoadPromise(asyncAction);
    }

    getIndexingInfo(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.indexingService.getIndexingInfo()
                .subscribe((res: IIndexing[]) => {
                    self.indexing = res;
                    resolve();
                });
        });
    }
}
