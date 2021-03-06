import { Component, OnDestroy, OnInit, Inject } from '@angular/core';

import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { firstFalse } from 'app/shared/custom.operators';

import { IssuesByYear } from 'app/models/issue';
import { RoutesResolver } from 'app/shared/routing-helpers/routes.resolver';
import { ISSUE_ENDPOINT, IssueEndpoint } from 'app/endpoints/endpoint/issue/issue.endpoint';

import { PageComponent } from 'app/client/pages/page.component';
import { ClientPageNamesResolver } from 'app/shared/routing-helpers/client.page.names.resolver';

@Component({
  selector: 'rs-archive',
  templateUrl: './archive.component.html'
})
export class ArchiveComponent extends PageComponent implements OnInit, OnDestroy {

  years: string[];
  issuesByYear: IssuesByYear;

  private readonly pageLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor(@Inject(ISSUE_ENDPOINT) private issueEndpoint: IssueEndpoint) { super(); }

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
        this.pageLoading$.next(false);
      });
  }

  ngOnDestroy() {
    this.pageLoading$.complete();

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  observePageLoaded(): Observable<void> {
    return this.pageLoading$.asObservable().pipe(firstFalse());
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
