import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ICustomModal, IssueModalBase} from "../modal/modal.base";
import {IssueService} from "../../../../pages/issue/issue.service";
import {ModalSpinnerService} from "../modal/modal.spinner.service";
import {Issue} from "../../../../models/article";

@Component({
    selector: 'make-issue-current',
    templateUrl: './make-issue-current.component.html',
    styles: []
})
export class MakeIssueCurrentComponent extends IssueModalBase implements OnInit, ICustomModal {
    parentInput: any;
    parentOutput: EventEmitter<any>;
    issue: Issue;

    constructor(private issueService: IssueService,
                private modalSpinnerService: ModalSpinnerService) {
        super();
    }

    ngOnInit() {
        this.issue = this.parentInput.issue;
        this.changeParentSubmitButtonState.emit(true);
    }

    submit() {
        this.modalSpinnerService.showSpinner();
        let newData = {
            isCurrent: true
        };
        let self = this;
        this.updateIssueData(this.issue.id, newData)
            .then(function () {
                self.modalSpinnerService.hideSpinner();
                self.parentOutput.emit(self.issue);
            });
    }

    updateIssueData(issueId: string, updatedIssueData: any): Promise<any> {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.issueService.putIssueData(issueId, updatedIssueData)
                .subscribe(res => {
                    resolve();
                });
        });
    }
}
