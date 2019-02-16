import { Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";

import { PageNameService } from 'app/shared/services/page.name.service';

@Injectable()
export class AdminPageNameService extends PageNameService {

  constructor(titleService: Title) { super(titleService); }

  setPageName(name: string): void {
    super.setPageName(`${name} | Admin`);
  }

}
