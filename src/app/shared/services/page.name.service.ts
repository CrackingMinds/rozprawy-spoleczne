import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Title} from "@angular/platform-browser";

@Injectable()
export class PageNameService {
  pageName = new Subject();
  constructor(private titleService: Title) { }

  setPageName(name: string) {
    this.pageName.next(name);
    this.titleService.setTitle(name + ' | Rozprawy Społeczne');
  }
}
