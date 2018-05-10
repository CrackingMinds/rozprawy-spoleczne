import {EventEmitter, OnInit} from "@angular/core";
import {Issue} from "../../../../models/article";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {INewIssueData} from "../../../../models/interfaces";
import {ModalSpinnerService} from "./modal.spinner.service";
import {IssueService} from "../../../../pages/issue/issue.service";

export interface ICustomModal {
    parentInput: any;
    parentOutput: EventEmitter<any>;
    changeParentSubmitButtonState: EventEmitter<boolean>;

    submit(): void;
}

export abstract class ModalBase implements ICustomModal{
    parentInput: any;
    parentOutput: EventEmitter<any>;
    changeParentSubmitButtonState: EventEmitter<boolean>;

    submit(): void {
    }
}

export abstract class IssueModalBase extends ModalBase implements OnInit {
    issue: Issue;

    constructor() {
        super();
    }

    ngOnInit() {
        this.issue = this.parentInput.issue;
    }
}

export abstract class IssueCreateEdit extends IssueModalBase implements OnInit{
    newIssueForm: FormGroup;
    newIssueData: INewIssueData = {
        year: '',
        volume: 0,
        number: 0,
        isCurrent: false
    };
    currentYear = new Date().getFullYear();
    errors = {
        year: '',
        volume: '',
        number: ''
    };
    modalTitle: string = '';

    constructor(private _formBuilder: FormBuilder) {
        super();
        this.createForm();
        this.catchFieldChanges();
    }

    ngOnInit() {
        this.newIssueForm.patchValue(this.newIssueData);
    }

    createForm() {
        this.newIssueForm = this._formBuilder.group({
            year: ['', [
                Validators.required,
                Validators.pattern('^\\d{4}$')
            ]],
            volume: ['', [
                Validators.required,
                Validators.pattern('^\\d{1,2}$')
            ]],
            number: ['', [
                Validators.required,
                Validators.pattern('^\\d{1,2}$')
            ]],
        });
    }

    catchFieldChanges() {
        this.newIssueForm.statusChanges.subscribe(val => {
            if (val === 'VALID') {
                this.changeParentSubmitButtonState.emit(true);
            }
            else {
                this.changeParentSubmitButtonState.emit(false);
            }
        });
        let yearField = this.newIssueForm.get('year');
        yearField.valueChanges.subscribe(val => {
            this.newIssueData.year = val;
        });
        let volumeField = this.newIssueForm.get('volume');
        volumeField.valueChanges.subscribe(val => {
            this.newIssueData.volume = val;
        });
        let numberField = this.newIssueForm.get('number');
        numberField.valueChanges.subscribe(val => {
            this.newIssueData.number = val;
        });
    }

    checkboxValueChanged() {
        this.newIssueData.isCurrent = !this.newIssueData.isCurrent;
    }
}