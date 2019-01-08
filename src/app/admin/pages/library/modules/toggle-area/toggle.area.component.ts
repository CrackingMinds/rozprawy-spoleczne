import { Component, Input } from '@angular/core';

import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'rs-toggle-area',
  templateUrl: './toggle.area.component.html',
  styleUrls: ['./toggle.area.component.scss']
})
export class ToggleAreaComponent {

  @Input()
  name: string;

  @Input()
  checked: boolean = false;

  constructor() {}

  onToggleChange(change: MatSlideToggleChange): void {
    this.checked = change.checked;
  }
}
