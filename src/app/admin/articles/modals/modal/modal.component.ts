import {Component, ComponentRef, EventEmitter, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ModalService} from "./modal.service";
import {ICustomModal} from "./modal.base";
import {ModalSpinnerService} from "./modal.spinner.service";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styles: []
})
export class ModalComponent implements OnInit {
    isSubmitBtnActive: boolean = false;
    componentInstanse: any;
    spinnerServiceObj: ModalSpinnerService;
    changeSubmitButtonStateEmitter: EventEmitter<boolean>;
    childEventEmitter: EventEmitter<any>;

    dcService: ModalService;
    @ViewChild('dynamicContent', {
        read: ViewContainerRef
    }) viewContainerRef: ViewContainerRef;

    constructor(@Inject(ModalService) dcService,
                public dialogRef: MatDialogRef<ModalComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any,
                private modalSpinnerService: ModalSpinnerService) {
        this.dcService = dcService;
    }

    ngOnInit() {
        this.spinnerServiceObj = this.modalSpinnerService;
        this.dcService.setRootViewContainerRef(this.viewContainerRef);
        this.componentInstanse = this.dcService.addDynamicComponent(this.data.componentToLoad);
        this.componentInstanse.parentInput = this.data.inputData;
        this.childEventEmitter = new EventEmitter<any>();
        this.changeSubmitButtonStateEmitter = new EventEmitter<boolean>();
        this.componentInstanse.parentOutput = this.childEventEmitter;
        this.componentInstanse.changeParentSubmitButtonState = this.changeSubmitButtonStateEmitter;

        let self = this;
        this.childEventEmitter
            .subscribe(function (value) {
                self.closeDialog(value);
            });
        this.changeSubmitButtonStateEmitter
            .subscribe(function (state) {
                self.isSubmitBtnActive = state;
            })
    }

    submitForm() {
        this.componentInstanse.submit();
    }

    cancel() {
        this.closeDialog();
    }

    closeDialog(returnedValue?) {
        this.dialogRef.close(returnedValue);
    }
}
