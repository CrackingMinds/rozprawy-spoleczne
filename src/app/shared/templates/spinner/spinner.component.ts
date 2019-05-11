import { Component, Input, ViewEncapsulation } from '@angular/core';

import { ThemePalette } from '@angular/material';

type ClassObj = { [className: string]: boolean };

@Component({
  selector: 'rs-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent {

  @Input()
  visible: boolean;

  @Input()
  color: ThemePalette;

  @Input()
  diameter: number = 100;

  @Input()
  containerClass: string;

  @Input()
  spinnerClass: string;

  constructor() {}

  getContainerClass(): ClassObj {
    const result = {};
    result[this.containerClass] = !!this.containerClass;
    return result;
  }

}
