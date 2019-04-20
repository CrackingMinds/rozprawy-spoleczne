import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';

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

  readonly linkedInProfileLink = 'https://www.linkedin.com/in/viacheslav-guselnykov-13b25b15a/';

  pageName: string;

  private readonly headerLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private readonly menuLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private readonly pageContentLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly pageLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly pageChange$: Subject<void> = new Subject();

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private pageNameService: PageNameService) {}

  ngOnInit() {
    this.initPageSpinnerManager();

    this.observeHeaderContentLoading();
    this.observeMenuContentLoading();
  }

  ngOnDestroy() {
    this.headerLoading$.complete();
    this.menuLoading$.complete();
    this.pageContentLoading$.complete();

    this.pageLoading$.complete();

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

    page.observeContentLoading()
      .pipe(takeUntil(this.pageChange$))
      .subscribe((contentLoading: boolean) => this.pageContentLoading$.next(contentLoading));
  }

  onDeactivate(page: PageComponent): void {
    this.pageContentLoading$.next(true);
    this.pageChange$.next();
  }

  getSpinnerVisibility(): Observable<boolean> {
    return this.pageLoading$.asObservable();
  }

  private observeMenuContentLoading(): void {
    const menuComponent: AsyncComponent = this.menuComponentRef;
    menuComponent.observeContentLoading()
                 .subscribe((contentLoading: boolean) => this.menuLoading$.next(contentLoading));
  }

  private observeHeaderContentLoading(): void {
    const headerComponent: AsyncComponent = this.headerComponentRef;
    headerComponent.observeContentLoading()
                   .subscribe((contentLoading: boolean) => this.headerLoading$.next(contentLoading));
  }

  private initPageSpinnerManager(): void {
    this.headerLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading: boolean) => {
        this.pageLoading$.next(loading || this.menuLoading$.getValue() || this.pageContentLoading$.getValue());
      });

    this.menuLoading$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((loading: boolean) => {
          this.pageLoading$.next(loading || this.headerLoading$.getValue() || this.pageContentLoading$.getValue());
        });

    this.pageContentLoading$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((loading: boolean) => {
          this.pageLoading$.next(loading || this.headerLoading$.getValue() || this.menuLoading$.getValue());
        });
  }

}
