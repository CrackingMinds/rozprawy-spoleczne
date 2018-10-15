import { Component, OnInit } from '@angular/core';
import { PageLoadSpinnerService } from 'app/page-load-spinner/page.load.spinner.service';
import { PageNameService } from 'app/shared/services/page.name.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rs-basic-wrapper',
  templateUrl: './basic.wrapper.component.html',
  styleUrls: ['./basic.wrapper.component.scss']
})
export class BasicWrapperComponent implements OnInit {
  linkedInProfileLink = 'https://www.linkedin.com/in/viacheslav-guselnykov-13b25b15a/';

  pageName: Observable<string>;

  constructor(private pageNameService: PageNameService,
    private pageLoadSpinnerService: PageLoadSpinnerService) {}

  ngOnInit() {
    this.pageLoadSpinnerService.showSpinner();
    this.pageName = this.pageNameService.observePageName();
  }
}
