import {PageNameService} from "./services/page.name.service";
import {OnInit} from "@angular/core";
import {SpinnerService} from "../services/spinner/spinner.service";

export class PageBase implements OnInit{
    pageName: string;
    asyncAction: any;

    constructor(private _spinnerService: SpinnerService,
                private _pageNameService: PageNameService) {
    }

    ngOnInit(): void {
        this._spinnerService.addContentLoadPromise(this.asyncAction);
    }

    changePageName(pageName: string) {
        this.pageName = pageName;
        this._pageNameService.setPageName(this.pageName);
    }
}