import {Injectable} from "@angular/core";

@Injectable()
export class MainSpinnerService {
    private showState: boolean = true;

    show() {
        this.showState = true;
    }

    hide() {
        this.showState = false;
    }

    getState(): boolean {
        return this.showState;
    }
}