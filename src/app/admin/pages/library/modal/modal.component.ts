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

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ModalData } from 'app/admin/pages/library/modal/modal.data';
import { ModalContent } from 'app/admin/pages/library/modal/content/modal.content';

@Component({
    selector: 'rs-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

    @ViewChild('dynamicContentContainer', { read: ViewContainerRef })
    dynamicComponentContainer: ViewContainerRef;

    nestedComponentRef: ComponentRef<ModalContent<any, any>>;

    modalMessage: string;

    spinnerVisible: boolean = false;

    canSubmit: boolean;

    private unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(public dialogRef: MatDialogRef<ModalComponent>,
                @Inject(MAT_DIALOG_DATA) public modalData: ModalData<any>,
                private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector) {
    }

    ngOnInit() {
      if (this.hasStringContent()) {
        this.modalMessage = this.modalData.content as string;
        this.canSubmit = true;
        return;
      }

      const componentFactory = this.componentFactoryResolver
                                 .resolveComponentFactory(this.modalData.content as Type<ModalContent<any, any>>);
      this.nestedComponentRef = componentFactory.create(this.injector);
      this.nestedComponentRef.instance.params = this.modalData.otherParams;
      this.dynamicComponentContainer.insert(this.nestedComponentRef.hostView);

      this.nestedComponentRef.changeDetectorRef.detectChanges();

      this.nestedComponentRef.instance.observeSubmitPossibility()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((canSubmit: boolean) => this.canSubmit = canSubmit);
    }

    ngOnDestroy() {
      if (this.nestedComponentRef) {
        this.nestedComponentRef.destroy();
        this.nestedComponentRef = null;
      }

      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }

    submit() {
      let returnedData: any;
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

    private closeDialog(data?: any) {
        this.dialogRef.close(data);
    }

    private hasStringContent(): boolean {
      return typeof this.modalData.content === 'string';
    }
}
