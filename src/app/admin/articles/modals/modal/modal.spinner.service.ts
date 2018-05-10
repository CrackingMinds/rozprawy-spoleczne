import {Injectable} from "@angular/core";

@Injectable()
export class ModalSpinnerService {
    private spinnerState: boolean = false;

    getState() {
        return this.spinnerState;
    }

    showSpinner() {
        this.spinnerState = true;
    }

    hideSpinner() {
        this.spinnerState = false;
    }
}