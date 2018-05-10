import {Component, OnInit} from '@angular/core';
import {IssueCreateEdit, IssueModalBase} from "../modal/modal.base";
import {IssueService} from "../../../../pages/issue/issue.service";
import {FormBuilder} from "@angular/forms";
import {ModalSpinnerService} from "../modal/modal.spinner.service";

@Component({
    selector: 'change-name',
    templateUrl: '../create-issue/create-issue.component.html',
    styles: []
})
export class ChangeNameComponent extends IssueCreateEdit implements OnInit {

    constructor(private issueService: IssueService,
                private formBuilder: FormBuilder,
                private modalSpinnerService: ModalSpinnerService) {
        super(formBuilder);
    }

    ngOnInit() {
        this.issue = this.parentInput.issue;
        console.log(this.issue);
        this.newIssueData = {
            year: this.issue.year,
            volume: this.issue.vol,
            number: this.issue.number,
            isCurrent: this.issue.isCurrent
        };
        super.ngOnInit();
        this.modalTitle = 'Zmiana danych numeru';
    }

    submit(): void {
        this.modalSpinnerService.showSpinner();
        let self = this;
        this.issueService.putIssueData(this.issue.id, this.newIssueData)
            .subscribe(res => {
                self.modalSpinnerService.hideSpinner();
                self.parentOutput.emit({
                    res: res,
                    updated: true
                });
            });
    }
}
