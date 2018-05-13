import {Injectable} from '@angular/core';
import {MainSpinnerService} from "../main-spinner/main.spinner.service";

@Injectable()
export class SpinnerService {
    private show: boolean = true;
    private isFirstSpinner: boolean = true;
    private menuLoaded: boolean = false;
    private headerLoaded: boolean = false;
    private contentLoaded: boolean = false;

    constructor(private _mainSpinnerService: MainSpinnerService) {
    }

    toggleSpinner() {
        this.show = !this.show;
    }

    showSpinner() {
        this.show = true;
    }

    hideSpinner() {
        this.show = false;
    }

    getState(): boolean {
        return this.show
    }

    addMenuLoadPromise(action: Promise<any>) {
        let self = this;
        action
            .then(function () {
                self.menuLoaded = true;
                self.checkLoadedModules();
            });
    }

    addHeaderLoadPromise(action: Promise<any>) {
        let self = this;
        action
            .then(function () {
                self.headerLoaded = true;
                self.checkLoadedModules();
            });
    }

    addContentLoadPromise(action: Promise<any>) {
        if (!this.getState()) {
            this.showSpinner();
        }
        let self = this;
        action
            .then(function () {
                self.contentLoaded = true;
                self.checkLoadedModules();
            });
    }

    checkLoadedModules() {
        if (this.menuLoaded && this.headerLoaded && this.contentLoaded) {
            if (this.isFirstSpinner) {
                this.isFirstSpinner = false;
                this._mainSpinnerService.hide();
            }
            this.hideSpinner();
        }
    }
}
