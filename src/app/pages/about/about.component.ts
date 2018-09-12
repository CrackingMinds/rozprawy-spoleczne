import {Component, OnInit} from '@angular/core';

import { PageNameService } from 'app/shared/services/page.name.service';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';

@Component({
    selector: 'about',
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

    constructor(private basicWrapperService: BasicWrapperService,
      private pageNameService: PageNameService) {}

    ngOnInit() {
        this.pageNameService.setPageName('O czasopiśmie');
        this.basicWrapperService.contentLoaded();
    }

}
