import {Component} from '@angular/core';
import {SpinnerService} from "./services/spinner/spinner.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor() {
    }
}
