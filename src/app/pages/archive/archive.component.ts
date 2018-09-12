import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Issue } from 'app/models/article';

import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';
import { PageNameService } from 'app/shared/services/page.name.service';
import { IssueService } from 'app/pages/issue/issue.service';
import { Utilits } from 'app/shared/services/utilits';

@Component({
    selector: 'archive',
    templateUrl: './archive.component.html'
})
export class ArchiveComponent implements OnInit, OnDestroy {
    archiveData: any;

    private subscriptions = new Subscription();

    constructor(private issueService: IssueService,
                private basicWrapperService: BasicWrapperService,
                private pageNameService: PageNameService) {}

    ngOnInit() {
      this.pageNameService.setPageName('Archiwum');

      this.subscriptions.add(
        this.issueService.getAllIssues()
            .subscribe(data => {
              this.archiveData = data;
              this.archiveData.sort(function (a: any, b: any) {
                return Utilits.sortByValue(a.year, b.year);
              });
              this.archiveData.forEach(function (year) {
                Utilits.sortIssues(year.issues);
              });
              this.basicWrapperService.contentLoaded();
            })
      );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }

    private createIssueTitleFromObj(issue: Issue, withYear: boolean = true): string {
        return Utilits.createIssueTitleFromObj(issue, withYear);
    }
}
