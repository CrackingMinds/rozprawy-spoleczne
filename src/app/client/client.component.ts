import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subject, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

import { allTruthy } from 'app/shared/custom.observable.creators';
import { firstTrue, withMinDuration } from 'app/shared/custom.operators';

import { PageNameService } from 'app/shared/services/page.name.service';

import { PageComponent } from 'app/client/pages/page.component';
import { MenuComponent } from 'app/shared/templates/menu/menu.component';
import { HeaderComponent } from 'app/shared/templates/header/header.component';
import { AsyncComponent } from 'app/client/pages/async.component';

@Component({
  selector: 'rs-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  @ViewChild(MenuComponent)
  menuComponentRef: MenuComponent;

  @ViewChild(HeaderComponent)
  headerComponentRef: HeaderComponent;

  pageName: string;
  pageLoading: boolean = true;

  readonly linkedInProfileLink = 'https://www.linkedin.com/in/viacheslav-guselnykov-13b25b15a/';

  private readonly headerLoaded$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  private readonly menuLoaded$: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private pageNameService: PageNameService) {}

  ngOnInit() {
    this.observeHeaderContentLoading();
    this.observeMenuContentLoading();
  }

  ngOnDestroy() {
    this.headerLoaded$.complete();
    this.menuLoaded$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onActivate(page: PageComponent): void {
    page.observePageName()
        .pipe(first())
        .subscribe((name: string) => {
          this.pageName = name;
          this.pageNameService.setPageName(this.pageName);
        });

    page.observePageLoaded()
        .pipe(
          withMinDuration(),
          first()
        )
        .subscribe(() => {
          allTruthy(
            this.headerLoaded$.asObservable(),
            this.menuLoaded$.asObservable(),
          ).pipe(firstTrue()).subscribe(() => this.pageLoading = false);
        });
  }

  onDeactivate(page: PageComponent): void {
    this.pageLoading = true;
  }

  private observeMenuContentLoading(): void {
    const menuComponent: AsyncComponent = this.menuComponentRef;
    menuComponent.observePageLoaded()
                 .pipe(first())
                 .subscribe(() => this.menuLoaded$.next(true));
  }

  private observeHeaderContentLoading(): void {
    const headerComponent: AsyncComponent = this.headerComponentRef;
    headerComponent.observePageLoaded()
                   .pipe(first())
                   .subscribe(() => this.headerLoaded$.next(true));
  }

}
