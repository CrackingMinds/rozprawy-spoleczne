import { Component, Input, OnInit } from '@angular/core';

import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'rs-toggle-area',
  templateUrl: './toggle.area.component.html',
  styleUrls: ['./toggle.area.component.scss']
})
export class ToggleAreaComponent implements OnInit {

  @Input()
  name: string;

  contentShown: boolean = false;

  constructor() {}

  ngOnInit() {

  }

  onToggleChange(change: MatSlideToggleChange): void {
    this.contentShown = change.checked;
  }
}
