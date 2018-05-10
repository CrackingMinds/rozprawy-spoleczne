import {Component, OnInit} from '@angular/core';
import {ICustomModal, IssueModalBase} from "../modal/modal.base";
import {Article} from "../../../../models/article";
import {IssueService} from "../../../../pages/issue/issue.service";
import {ModalSpinnerService} from "../modal/modal.spinner.service";

@Component({
    selector: 'remove-issue',
    templateUrl: './remove.issue.component.html',
    styles: []
})
export class RemoveIssueComponent extends IssueModalBase implements OnInit {
    articles: Article[];
    cantDeleteIssue: boolean = false;

    constructor(private issueService: IssueService,
                private modalSpinnerService: ModalSpinnerService) {
        super();
    }

    ngOnInit() {
        this.issue = this.parentInput.issue.issue;
        this.articles = this.parentInput.issue.articles;

        if (this.articles.length > 0) {
            this.cantDeleteIssue = true;
        }
        else {
            this.changeParentSubmitButtonState.emit(true);
        }
    }

    submit(): void {
        this.modalSpinnerService.showSpinner();
        let self = this;
        this.deleteIssue(this.issue.id)
            .then(function () {
                self.modalSpinnerService.hideSpinner();
                self.parentOutput.emit({ deleted: true });
            });
    }

    deleteIssue(issueId: string): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.issueService.deleteIssue(issueId)
                .subscribe(res => {
                    resolve();
                });
        });
    }
}
