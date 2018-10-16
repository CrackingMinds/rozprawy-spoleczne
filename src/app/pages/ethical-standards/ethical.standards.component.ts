import { Component, OnInit } from '@angular/core';

import { PageNameService } from 'app/shared/services/page.name.service';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';

@Component({
  selector: 'rs-ethical-standards',
  templateUrl: './ethical.standards.component.html',
  styleUrls: ['./ethical.standards.component.scss']
})
export class EthicalStandardsComponent implements OnInit {

  constructor(private pageNameService: PageNameService,
              private basicWrapperService: BasicWrapperService) {}

  ngOnInit() {
    this.pageNameService.setPageName('Standardy etyczne');
    this.basicWrapperService.contentLoaded();
  }
}
