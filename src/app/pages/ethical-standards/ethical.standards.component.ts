import { Component, OnInit } from '@angular/core';

import { PageNameService } from 'app/shared/services/page.name.service';

@Component({
  selector: 'rs-ethical-standards',
  templateUrl: './ethical.standards.component.html',
  styleUrls: ['./ethical.standards.component.scss']
})
export class EthicalStandardsComponent implements OnInit {

  constructor(private pageNameService: PageNameService) {}

  ngOnInit() {
    this.pageNameService.setPageName('Standardy etyczne');
  }
}
