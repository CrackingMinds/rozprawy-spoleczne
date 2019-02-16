import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IssuesByYear } from 'app/models/issue';
import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';
import { IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';

import { PageComponent } from 'app/client/pages/page.component';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-archive',
  templateUrl: './archive.component.html'
})
export class ArchiveComponent extends PageComponent implements OnInit, OnDestroy {

  years: string[];
  issuesByYear: IssuesByYear;

  private pageLoaded$: Subject<void> = new Subject<void>();

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private issueEndpoint: IssueEndpoint) { super(); }

  ngOnInit() {

    this.issueEndpoint.getAllIssuesByYear()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: IssuesByYear) => {
        this.issuesByYear = data;
        this.years = Object.keys(this.issuesByYear).sort((a: string, b: string) => {

          if (a > b) {
            return -1;
          }

          if (a < b) {
            return 1;
          }
          if (a === b) {
            return 0;
          }

        });
        this.pageLoaded$.next();
      });
  }

  ngOnDestroy() {
    this.pageLoaded$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observeContentLoaded(): Observable<void> {
    return this.pageLoaded$.asObservable();
  }

  observePageName(): Observable<string> {
    return of(ClientPageNamesResolver.archive());
  }

  composeIssueRouterLink(issueId: string): string[] {
    return [
      `/${RoutesResolver.issue()}`,
      issueId
    ];
  }

}
