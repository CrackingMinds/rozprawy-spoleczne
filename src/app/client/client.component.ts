import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, zip, Subject } from 'rxjs';
import { map, takeUntil, first } from 'rxjs/operators';

import { PageNameService } from 'app/shared/services/page.name.service';

import { IssueComponent } from 'app/client/pages/issue/issue.component';
import { Page } from 'app/pages/page';

@Component({
  selector: 'rs-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  linkedInProfileLink = 'https://www.linkedin.com/in/viacheslav-guselnykov-13b25b15a/';

  pageName: string;

  private headerLoaded$: Observable<void>;
  private menuLoaded$: Observable<void>;
  private contentLoaded$: Subject<boolean> = new Subject<boolean>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private pageNameService: PageNameService) {}

  ngOnInit() {
    this.contentLoaded$.subscribe((value: boolean) => console.log('content loaded: ', value));
  }

  ngOnDestroy() {
    this.contentLoaded$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onActivate(page: Page): void {
    page.observePageName()
        .pipe(first())
        .subscribe((name: string) => {
          this.pageName = name;
          this.pageNameService.setPageName(this.pageName);
        });

    page.observeContentLoaded()
      .pipe(first())
      .subscribe(() => {
        this.contentLoaded$.next(true);
      });
  }

  onDeactivate(page: Page): void {
    this.contentLoaded$.next(false);
  }

}
