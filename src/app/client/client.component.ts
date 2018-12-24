import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject, Observable, Subject, zip } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';

import { PageNameService } from 'app/shared/services/page.name.service';

import { Page } from 'app/pages/page';
import { MenuComponent } from 'app/shared/templates/menu/menu.component';
import { HeaderComponent } from 'app/shared/templates/header/header.component';
import { AsyncComponent } from 'app/pages/async.component';

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

  linkedInProfileLink = 'https://www.linkedin.com/in/viacheslav-guselnykov-13b25b15a/';

  pageName: string;

  private headerLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private menuLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private pageContentLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private pageLoaded$: Observable<boolean>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private pageNameService: PageNameService) {}

  ngOnInit() {
    this.pageLoaded$ = zip(
      this.headerLoaded$.asObservable(),
      this.menuLoaded$.asObservable(),
      this.pageContentLoaded$.asObservable()
    ).pipe(
      map((contentLoading: boolean[]) => {
        const headerLoaded = contentLoading[0];
        const menuLoaded = contentLoading[1];
        const contentLoaded = contentLoading[2];
        return headerLoaded && menuLoaded && contentLoaded;
      }),
      takeUntil(this.unsubscribe$)
    );

    this.observeHeaderContentLoading();
    this.observeMenuContentLoading();
  }

  ngOnDestroy() {
    this.headerLoaded$.complete();
    this.menuLoaded$.complete();
    this.pageContentLoaded$.complete();

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
        this.pageContentLoaded$.next(true);
      });
  }

  onDeactivate(page: Page): void {
    this.pageContentLoaded$.next(false);
  }

  private observeMenuContentLoading(): void {
    const menuComponent: AsyncComponent = this.menuComponentRef;
    menuComponent.observeContentLoaded()
                 .pipe(first())
                 .subscribe(() => this.menuLoaded$.next(true));
  }

  private observeHeaderContentLoading(): void {
    const headerComponent: AsyncComponent = this.headerComponentRef;
    headerComponent.observeContentLoaded()
                   .pipe(first())
                   .subscribe(() => this.headerLoaded$.next(true));
  }

}
