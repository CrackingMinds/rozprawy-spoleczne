import { Type } from '@angular/core';

import { ModalContentComponent } from 'app/admin/library/list-of-issues/modals/modal/modal.content.component';
import { ModalButtons } from 'app/admin/library/list-of-issues/modals/modal/modal.buttons';
import { ModalParams } from 'app/admin/library/list-of-issues/modals/modal/modal.params';

export interface ModalData {
  title: string;
  content: Type<ModalContentComponent>;
  buttons: ModalButtons;
  otherParams: ModalParams;
}
