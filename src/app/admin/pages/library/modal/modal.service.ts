import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ModalData } from 'app/admin/pages/library/modal/modal.data';
import { ModalComponent } from 'app/admin/pages/library/modal/modal.component';

@Injectable()
export class ModalService {

	constructor(private dialog: MatDialog) {}

	open(data: ModalData, customCssClass?: string): MatDialogRef<any> {

	  let dialogCssClass: string;
	  const defaultCssClass: string = 'rs-modal-panel';

	  if (customCssClass) {
      dialogCssClass = customCssClass;
    } else {
	    dialogCssClass = defaultCssClass;
    }

    return this.dialog.open(ModalComponent, {
      disableClose: true,
      data: data,
      panelClass: dialogCssClass
    });

  }

}
