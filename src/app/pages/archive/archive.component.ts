import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IssueService} from "../issue/issue.service";
import {SpinnerService} from "../../services/spinner/spinner.service";
import {PageNameService} from "../../shared/services/page.name.service";
import {PageBase} from "../../shared/page.base";
import {Utilits} from "../../shared/services/utilits";
import {Issue} from "../../models/article";

@Component({
    selector: 'archive',
    templateUrl: './archive.component.html'
})
export class ArchiveComponent extends PageBase implements OnInit {
    archiveData: any;

    constructor(private issueService: IssueService,
                private spinnerService: SpinnerService,
                private pageNameService: PageNameService) {
        super(
            spinnerService,
            pageNameService
        );
    }

    ngOnInit() {
        this.asyncAction = this.getArchiveData();
        let self = this;
        this.asyncAction
            .then(function () {
                self.changePageName('Archiwum');
            });
        super.ngOnInit();
    }

    protected getArchiveData(): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.issueService.getAllIssues()
                .subscribe(data => {
                    self.archiveData = data;
                    self.archiveData.sort(function (a: any, b: any) {
                        return Utilits.sortByValue(a.year, b.year);
                    });
                    self.archiveData.forEach(function (year) {
                        Utilits.sortIssues(year.issues);
                    });
                    resolve();
                });
        });
    }

    private createIssueTitleFromObj(issue: Issue, withYear: boolean = true): string {
        return Utilits.createIssueTitleFromObj(issue, withYear);
    }
}
