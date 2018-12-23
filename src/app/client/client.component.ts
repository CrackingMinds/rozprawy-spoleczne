import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { PageNameService } from 'app/shared/services/page.name.service';

import { ClientContentService } from 'app/client/client.content.service';

@Component({
  selector: 'rs-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  linkedInProfileLink = 'https://www.linkedin.com/in/viacheslav-guselnykov-13b25b15a/';

  pageName: Observable<string>;

  constructor(private pageNameService: PageNameService,
              private clientContentService: ClientContentService) {}

  ngOnInit() {
    this.pageName = this.pageNameService.observePageName();
  }

  ngOnDestroy() {
    this.clientContentService.destroy();
  }

}
