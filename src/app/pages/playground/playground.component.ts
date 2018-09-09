import { Component } from '@angular/core';
import { SpinnerService } from 'app/services/spinner/spinner.service';
import { PageNameService } from 'app/shared/services/page.name.service';
import { PageBase } from 'app/shared/page.base';

@Component({
  selector: 'rs-playground-component',
  templateUrl: './playground.component.html'
})
export class PlaygroundComponent extends PageBase{

  constructor(private spinnerService: SpinnerService,
              private pageNameService: PageNameService) {
    super(
      spinnerService,
      pageNameService
    );
  }

  ngOnInit() {
    if (!this.spinnerService.getState()) {
      this.spinnerService.showSpinner();
    }

    this.asyncAction = this.asyncPlaceholder();
    let self = this;
    this.asyncAction
        .then(function () {
          self.changePageName('RS Playground');
        });
    super.ngOnInit();
  }

  asyncPlaceholder(): Promise<any> {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, 1000);
    });
  }
}
