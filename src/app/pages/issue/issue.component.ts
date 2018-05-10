import {Component, Input, OnInit} from '@angular/core';
import {Article, Issue} from "../../models/article";
import {ActivatedRoute} from "@angular/router";
import {SpinnerService} from "../../services/spinner/spinner.service";
import {IssueService} from "./issue.service";
import {PageNameService} from "../../shared/services/page.name.service";
import {PageBase} from "../../shared/page.base";

@Component({
    selector: 'issue',
    templateUrl: './issue.component.html'
})
export class IssueComponent extends PageBase implements OnInit {
    issue: Issue;
    articles: Article[];
    issueTitle: string;
    asyncAction: any;

    constructor(private route: ActivatedRoute,
                private issueService: IssueService,
                private spinnerService: SpinnerService,
                private pageNameService: PageNameService) {
        super(
            spinnerService,
            pageNameService
        );
    }

    ngOnInit() {
        this.asyncAction = this.getIssueData();
        let self = this;
        this.asyncAction
            .then(function () {
                self.changePageName('Bieżący numer');
            });
        super.ngOnInit();
        // this.getIssueData();
    }

    protected getIssueData(): Promise<any> {
        let isCurrentIssue: boolean = false;
        let issueId: string;
        let self = this;
        return new Promise(function (resolve, reject) {
            self.route.data
                .subscribe(data => {
                    if (data.hasOwnProperty('currentIssue')) {
                        isCurrentIssue = data.currentIssue;

                        if (isCurrentIssue) {
                            self.issueService.getCurrentIssue().subscribe((res) => {
                                self.setIssueData(res);
                                resolve();
                            });
                        }
                        else {
                            self.route.paramMap
                                .subscribe(params => {
                                    issueId = params.get('id');
                                    self.issueService.getIssue(issueId).subscribe((res) => {
                                        self.setIssueData(res);
                                        resolve();
                                    });
                                });
                        }
                    }
                });
        });
    }

    private setIssueData(data: any) {
        this.issue = data.issue;
        this.articles = data.articles;
        this.issueTitle = new Date(this.issue.year).getFullYear() + ' - Tom ' + this.issue.vol + ' Nr ' + this.issue.number;
    }
}
