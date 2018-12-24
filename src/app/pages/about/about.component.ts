import {Component, OnInit} from '@angular/core';

import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
    selector: 'about',
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

    constructor(private pageNameService: PageNameService) {}

    ngOnInit() {
        this.pageNameService.setPageName('O czasopiśmie');
    }

}
