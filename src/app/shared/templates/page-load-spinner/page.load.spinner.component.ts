import { Component, Input } from '@angular/core';

@Component({
  selector: 'rs-spinner',
  templateUrl: './page.load.spinner.component.html',
  styleUrls: ['./page.load.spinner.component.scss']
})
export class PageLoadSpinnerComponent {

  @Input()
  visible: boolean;

  constructor() {}

}
