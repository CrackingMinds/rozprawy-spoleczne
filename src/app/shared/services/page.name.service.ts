import { Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PageNameService {
  private pageName$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private titleService: Title) { }

  setPageName(name: string) {
    this.pageName$.next(name);
    this.titleService.setTitle(name + ' | Rozprawy Społeczne');
  }

  observePageName(): Observable<string> {
    return this.pageName$.asObservable();
  }
}
