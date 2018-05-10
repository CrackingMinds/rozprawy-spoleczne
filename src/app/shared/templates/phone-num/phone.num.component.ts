import {Component, Input, OnInit} from '@angular/core';
import {IPhoneNum} from "../../../models/phone-num";

@Component({
  selector: 'phone-num',
  templateUrl: './phone.num.component.html',
  styles: []
})
export class PhoneNumComponent implements OnInit {
  @Input() phone_num: IPhoneNum;

  constructor() { }

  ngOnInit() {
  }

}
