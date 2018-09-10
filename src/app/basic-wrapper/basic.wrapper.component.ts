import { Component } from '@angular/core';
import { SpinnerService } from 'app/services/spinner/spinner.service';
import { MainSpinnerService } from 'app/services/main-spinner/main.spinner.service';
import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
  selector: 'rs-basic-wrapper',
  templateUrl: './basic.wrapper.component.html'
})
export class BasicWrapperComponent {
  spinnerServiceObj: SpinnerService;
  mainSpinnerServiceObj: MainSpinnerService;
  pageName: string;
  linkedInProfileLink = 'https://www.linkedin.com/in/viacheslav-guselnykov-13b25b15a/';


  constructor(
    private spinnerService: SpinnerService,
    private mainSpinnerService: MainSpinnerService,
    private pageNameService: PageNameService
  ) {
  }

  ngOnInit() {
    this.spinnerServiceObj = this.spinnerService;
    this.mainSpinnerServiceObj = this.mainSpinnerService;
    let self = this;
    this.pageNameService.pageName
        .subscribe(function (pageName: string) {
          self.pageName = pageName;
        })
  }
}
