import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Article, Issue } from 'app/models/article';

import { IssueService } from 'app/pages/issue/issue.service';
import { Utilits } from 'app/shared/services/utilits';
import { ModalComponent } from 'app/admin/articles/modals/modal/modal.component';
import { CreateIssueComponent } from 'app/admin/articles/modals/create-issue/create-issue.component';
import { MakeIssueCurrentComponent } from 'app/admin/articles/modals/make-issue-current/make-issue-current.component';
import { RemoveIssueComponent } from 'app/admin/articles/modals/remove-issue/remove.issue.component';
import { ChangeNameComponent } from 'app/admin/articles/modals/change-name/change-name.component';
import { PageNameService } from 'app/shared/services/page.name.service';

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
export class ArticlesComponent implements OnInit {
    issues: FullIssueInfo[] = [];
    articles: Article[];
    dataLoaded: boolean = false;
    lastCurrentIssue: FullIssueInfo;
    lastSelectedIssue: FullIssueInfo;

    constructor(private route: ActivatedRoute,
                private issueService: IssueService,
                private dialog: MatDialog,
                private pageNameService: PageNameService) {
    }

    ngOnInit() {
      this.pageNameService.setPageName('Numery');

      this.route.data
          .subscribe((data) => {
            this.issueService.getAllIssuesWithArticles()
                .subscribe((res: any[]) => {
                  res.forEach((item) => {
                    let issue = this.setIssueData(item);
                    if (issue.issue.isCurrent) {
                      this.selectIssue(issue);
                      this.lastCurrentIssue = issue;
                    }
                    this.issues.push(issue);
                  });
                  this.dataLoaded = true;
                  this.sortIssues();
                });
          });
    }

    private setIssueData(data: any): FullIssueInfo {
        let issue: Issue = data.issue;
        let articles = data.articles;
        let issueTitle = Utilits.createIssueTitleFromObj(issue);
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
                issue.issueTitle = Utilits.createIssueTitleFromObj(issue.issue);
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
        this.issues.sort(function (a: FullIssueInfo, b: FullIssueInfo) {
            let aIssue: Issue = a.issue;
            let bIssue: Issue = b.issue;
            if (aIssue.year === bIssue.year) {

                if (aIssue.vol === bIssue.vol) {

                    if (aIssue.number === bIssue.number) {
                        return 0;
                    }
                    else {
                        return Utilits.sortByValue(aIssue.number, bIssue.number);
                    }
                }
                else {
                    return Utilits.sortByValue(aIssue.vol, bIssue.vol);
                }
            }
            else {
                return Utilits.sortByValue(aIssue.year, bIssue.year);
            }
        });
    }
}
