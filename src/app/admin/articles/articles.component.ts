import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IssueService} from "../../pages/issue/issue.service";
import {SpinnerService} from "../../services/spinner/spinner.service";
import {Article, Issue} from "../../models/article";
import {MatDialog} from "@angular/material";
import {CreateIssueComponent} from "./modals/create-issue/create-issue.component";
import {INewIssueData} from "../../models/interfaces";
import {PageBase} from "../../shared/page.base";
import {PageNameService} from "../../shared/services/page.name.service";
import {ModalComponent} from "./modals/modal/modal.component";
import {MakeIssueCurrentComponent} from "./modals/make-issue-current/make-issue-current.component";
import {RemoveIssueComponent} from "./modals/remove-issue/remove.issue.component";
import {ChangeNameComponent} from "./modals/change-name/change-name.component";

interface FullIssueInfo {
    issue: Issue;
    articles: Article[];
    issueTitle: string;
    selected: boolean;
}

@Component({
    selector: 'articles-editorial',
    templateUrl: './articles.component.html'
})
export class ArticlesComponent extends PageBase implements OnInit {
    issues: FullIssueInfo[] = [];
    articles: Article[];
    dataLoaded: boolean = false;
    lastCurrentIssue: FullIssueInfo;
    lastSelectedIssue: FullIssueInfo;

    constructor(private route: ActivatedRoute,
                private issueService: IssueService,
                private spinnerService: SpinnerService,
                private dialog: MatDialog,
                private pageNameService: PageNameService) {
        super(
            spinnerService,
            pageNameService
        );
    }

    ngOnInit() {
        this.asyncAction = this.getIssuesData();
        let self = this;
        this.asyncAction
            .then(function () {
                self.changePageName('Numery');
            });
        super.ngOnInit();
    }

    protected getIssuesData(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.route.data
                .subscribe((data) => {
                    self.issueService.getAllIssuesWithArticles()
                        .subscribe((res) => {
                            res.forEach(function (item) {
                                let issue = self.setIssueData(item);
                                if (issue.issue.isCurrent) {
                                    self.selectIssue(issue);
                                    self.lastCurrentIssue = issue;
                                }
                                self.issues.push(issue);
                            });
                            self.dataLoaded = true;
                            self.sortIssues();
                            resolve();
                        });
                });
        });
    }

    private setIssueData(data: any): FullIssueInfo {
        let issue: Issue = data.issue;
        let articles = data.articles;
        let issueTitle = this.createIssueTitle(issue);
        let selected = false;
        return {
            issue: issue,
            articles: articles,
            issueTitle: issueTitle,
            selected: selected
        };
    }

    openIssueCreationDialog(): void {
        let dialogRef = this.dialog.open(ModalComponent, {
            disableClose: true,
            data: {
                componentToLoad: CreateIssueComponent
            }
        });
        dialogRef.afterClosed()
            .subscribe(res => {
                if (!res) {
                    return;
                }
                if (!res.hasOwnProperty('created')) {
                    return;
                }
                let issueData = res.res;
                let data = {
                    issue: issueData,
                    articles: []
                };
                let finalData: FullIssueInfo = this.setIssueData(data);
                if (issueData.isCurrent) {
                    this.markIssueAsCurrent(finalData);
                }
                this.issues.push(finalData);
                this.selectIssue(finalData);
                this.sortIssues();
            });
    }

    openMakeIssueCurrentDialog(issue: FullIssueInfo): void {
        let dialogRef = this.dialog.open(ModalComponent, {
            disableClose: true,
            data: {
                componentToLoad: MakeIssueCurrentComponent,
                inputData: { issue: issue.issue }
            }
        });
        dialogRef.afterClosed()
            .subscribe(issueData => {
                if (!issueData) {
                    return;
                }
                issue.issue = issueData;
                this.markIssueAsCurrent(issue);
                this.selectIssue(issue);
            });
    }

    openIssueRemovalDialog(issue: FullIssueInfo): void {
        let dialogRef = this.dialog.open(ModalComponent, {
            disableClose: true,
            data: {
                componentToLoad: RemoveIssueComponent,
                inputData: { issue: issue }
            }
        });
        let self = this;
        dialogRef.afterClosed()
            .subscribe(function (res) {
                if (!res) {
                    return;
                }
                if (!res.hasOwnProperty('deleted')) {
                    return;
                }
                self.removeIssue(issue);
                if (issue.issue.isCurrent) {
                    self.lastCurrentIssue = null;
                }
                else {
                    if (issue.selected) {
                        if (self.issues.length > 1) {
                            self.selectIssue(self.issues[0]);
                        }
                    }
                }
            });
    }

    openChangeNameDialog(issue: FullIssueInfo) {
        let dialogRef = this.dialog.open(ModalComponent, {
            disableClose: true,
            data: {
                componentToLoad: ChangeNameComponent,
                inputData: { issue: issue.issue }
            }
        });
        dialogRef.afterClosed()
            .subscribe(res => {
                if (!res) {
                    return;
                }
                if (!res.hasOwnProperty('updated')) {
                    return;
                }
                let issueData = res.res;
                issue.issue = issueData;
                issue.issueTitle = this.createIssueTitle(issue.issue);
                if (issueData.isCurrent) {
                    this.markIssueAsCurrent(issue);
                }
                this.sortIssues();
            });
    }

    selectIssue(issue: FullIssueInfo) {
        if (this.lastSelectedIssue) {
            this.lastSelectedIssue.selected = false;
        }
        this.lastSelectedIssue = issue;
        issue.selected = true;
        this.articles = issue.articles;
    }

    markIssueAsCurrent(issue: FullIssueInfo) {
        if (this.lastCurrentIssue) {
            this.lastCurrentIssue.issue.isCurrent = false;
        }
        issue.issue.isCurrent = true;
        this.lastCurrentIssue = issue;
    }

    removeIssue(issue: FullIssueInfo) {
        let index = this.issues.indexOf(issue);
        if (index !== -1) {
            this.issues.splice(index, 1);
        }
    }

    sortIssues() {
        let self = this;
        this.issues.sort(function (a: FullIssueInfo, b: FullIssueInfo) {
            let aIssue: Issue = a.issue;
            let bIssue: Issue = b.issue;
            if (aIssue.year === bIssue.year) {

                if (aIssue.vol === bIssue.vol) {

                    if (aIssue.number === bIssue.number) {
                        return 0;
                    }
                    else {
                        return self.sortByValue(aIssue.number, bIssue.number);
                    }
                }
                else {
                    return self.sortByValue(aIssue.vol, bIssue.vol);
                }
            }
            else {
                return self.sortByValue(aIssue.year, bIssue.year);
            }
        })
    }

    private sortByValue(a, b) {
        if (a < b) {
            return 1;
        }
        else if (a > b) {
            return -1;
        }
        else {
            return 0;
        }
    }

    private createIssueTitle(issue: Issue): string {
        return new Date(issue.year).getFullYear() + ' - Tom ' + issue.vol + ' Nr ' + issue.number;
    }
}
