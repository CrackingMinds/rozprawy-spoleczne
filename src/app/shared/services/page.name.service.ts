import { Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Injectable()
export class PageNameService {

  constructor(private titleService: Title) {}

  setPageName(name: string) {
    this.titleService.setTitle(name + ' | Rozprawy Społeczne');
  }

}
