import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../services/spinner/spinner.service";

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin.dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
  }

}
