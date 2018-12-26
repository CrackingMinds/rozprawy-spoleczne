import {
  Component,
  ComponentRef,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  OnDestroy,
  Type
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ModalData } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.data';
import { ModalContentComponent, ModalReturnData } from 'app/admin/pages/library/list-of-issues/modals/modal/modal.content.component';

@Component({
    selector: 'rs-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

    @ViewChild('dynamicContentContainer', { read: ViewContainerRef })
    dynamicComponentContainer: ViewContainerRef;

    nestedComponentRef: ComponentRef<ModalContentComponent>;

    modalMessage: string;

    spinnerVisible: boolean = false;

    get canSubmit(): boolean {
      if (this.hasStringContent()) {
        return true;
      }
      return this.nestedComponentRef.instance.canSubmit;
    }

    constructor(public dialogRef: MatDialogRef<ModalComponent>,
                @Inject(MAT_DIALOG_DATA) public modalData: ModalData,
                private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector) {
    }

    ngOnInit() {
      if (this.hasStringContent()) {
        this.modalMessage = this.modalData.content as string;
        return;
      }

      let componentFactory = this.componentFactoryResolver
                                 .resolveComponentFactory(this.modalData.content as Type<ModalContentComponent>);
      this.nestedComponentRef = componentFactory.create(this.injector);
      this.nestedComponentRef.instance.params = this.modalData.otherParams;
      this.dynamicComponentContainer.insert(this.nestedComponentRef.hostView);
    }

    ngOnDestroy() {
      if (this.nestedComponentRef) {
        this.nestedComponentRef.destroy();
        this.nestedComponentRef = null;
      }
    }

    submit() {
      let returnedData: ModalReturnData;
      if (this.hasStringContent()) {
        returnedData = true;
      } else {
        returnedData = this.nestedComponentRef.instance.submit();
      }
      this.closeDialog(returnedData);
    }

    cancel() {
      if (!this.hasStringContent()) {
        this.nestedComponentRef.instance.cancel();
      }
      this.closeDialog();
    }

    private closeDialog(data?: ModalReturnData) {
        this.dialogRef.close(data);
    }

    private hasStringContent(): boolean {
      return typeof this.modalData.content === 'string';
    }
}
