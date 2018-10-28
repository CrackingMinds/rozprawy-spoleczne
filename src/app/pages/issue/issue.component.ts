import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

import { Issue } from 'app/models/issue';
import { Article } from 'app/models/article';

import { IssueService } from 'app/pages/issue/issue.service';
import { PageNameService } from 'app/shared/services/page.name.service';
import { Utilits } from 'app/shared/services/utilits';
import { BasicWrapperService } from 'app/basic-wrapper/basic.wrapper.service';


@Component({
    selector: 'issue',
    templateUrl: './issue.component.html'
})
export class IssueComponent implements OnInit, OnDestroy {
    issue: Issue;
    articles: Article[];
    issueTitle: string;
    asyncAction: any;

  private subscriptions = new Subscription();


  constructor(private route: ActivatedRoute,
                private issueService: IssueService,
                private pageNameService: PageNameService,
              private basicWrapperService: BasicWrapperService) {
    }

    ngOnInit() {
      let isCurrentIssue: boolean = false;
      let issueId: string;

      // this.subscriptions.add(
      //   this.route.data
      //       .subscribe(data => {
      //         if (data.hasOwnProperty('currentIssue')) {
      //           isCurrentIssue = data.currentIssue;
	  //
      //           if (isCurrentIssue) {
      //             this.subscriptions.add(
      //               this.issueService.getCurrentIssue().subscribe((res) => {
      //                 this.setIssueData(res);
      //                 let issueTitle = Utilits.createIssueTitleFromObj(this.issue);
      //                 this.pageNameService.setPageName('Bieżący numer | ' + issueTitle);
      //                 this.basicWrapperService.contentLoaded();
      //               })
      //             );
      //           }
      //           else {
      //             this.subscriptions.add(
      //               this.route.paramMap
      //                   .subscribe(params => {
      //                     issueId = params.get('id');
      //                     this.subscriptions.add(
      //                       this.issueService.getIssue(issueId).subscribe((res) => {
      //                         this.setIssueData(res);
      //                         let issueTitle = Utilits.createIssueTitleFromObj(this.issue);
      //                         this.pageNameService.setPageName(issueTitle);
      //                         this.basicWrapperService.contentLoaded();
      //                       })
      //                     );
      //                   })
      //             );
      //           }
      //         }
      //       })
      // );
    }

    ngOnDestroy() {
      this.subscriptions.unsubscribe();
    }

    private setIssueData(data: any) {
        // this.issue = data.issue;
        // this.articles = data.articles;
        // this.issueTitle = new Date(this.issue.year).getFullYear() + ' - Tom ' + this.issue.vol + ' Nr ' + this.issue.number;
    }
}
