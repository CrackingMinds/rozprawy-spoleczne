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
  OnDestroy
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ModalData } from 'app/admin/library/list-of-issues/modals/modal/modal.data';
import { ModalContentComponent } from 'app/admin/library/list-of-issues/modals/modal/modal.content.component';

@Component({
    selector: 'rs-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

    @ViewChild('dynamicContentContainer', { read: ViewContainerRef })
    dynamicComponentContainer: ViewContainerRef;

    nestedComponentRef: ComponentRef<ModalContentComponent>;

    spinnerVisible: boolean = false;

    get canSubmit(): boolean {
      return this.nestedComponentRef.instance.canSubmit;
    }

    constructor(public dialogRef: MatDialogRef<ModalComponent>,
                @Inject(MAT_DIALOG_DATA) private modalData: ModalData,
                private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector) {
    }

    ngOnInit() {
      let componentFactory = this.componentFactoryResolver
                                 .resolveComponentFactory(this.modalData.content);
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
      this.spinnerVisible = true;
      this.nestedComponentRef.instance.submit().then(() => {
        this.closeDialog();
      });
    }

    cancel() {
      this.spinnerVisible = true;
      this.nestedComponentRef.instance.cancel().then(() => {
          this.closeDialog();
        });
    }

    private closeDialog() {
        this.dialogRef.close();
    }
}
