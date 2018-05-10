import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {INewIssueData} from "../../../../models/interfaces";
import {IssueService} from "../../../../pages/issue/issue.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IssueCreateEdit, IssueModalBase} from "../modal/modal.base";
import {ModalSpinnerService} from "../modal/modal.spinner.service";

@Component({
    selector: 'create-issue',
    templateUrl: './create-issue.component.html'
})
export class CreateIssueComponent extends IssueCreateEdit implements OnInit {

    constructor(private issueService: IssueService,
                private formBuilder: FormBuilder,
                private modalSpinnerService: ModalSpinnerService) {
        super(formBuilder);
    }

    ngOnInit() {
        super.ngOnInit();
        this.modalTitle = 'Dodanie nowego numeru';
    }

    submit(): void {
        this.modalSpinnerService.showSpinner();
        let self = this;
        this.issueService.postIssue(this.newIssueData)
            .subscribe(res => {
                self.modalSpinnerService.hideSpinner();
                self.parentOutput.emit({
                    res: res,
                    created: true
                });
            });
    }
}

