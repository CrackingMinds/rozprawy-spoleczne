import {Injectable} from '@angular/core';

@Injectable()
export class SpinnerService {
    private show: boolean = true;
    private asyncActionPromises: Promise<any>[] = [];

    constructor() {
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

    addAsyncAction(action: any) {
        if (!this.getState()) {
            this.showSpinner();
        }
        let previousPromisesCount = this.asyncActionPromises.length;
        this.asyncActionPromises.push(action);
        if (previousPromisesCount == 0) {
            let self = this;
            Promise.all(this.asyncActionPromises)
                .then(function () {
                    self.asyncActionPromises = [];
                    self.hideSpinner();
                });
        }
    }
}
