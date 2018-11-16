import { Type } from '@angular/core';

import { ModalContentComponent, ModalParams } from 'app/admin/library/list-of-issues/modals/modal/modal.content.component';
import { ModalButtons } from 'app/admin/library/list-of-issues/modals/modal/modal.buttons';

export interface ModalData {
  title: string | null;
  content: Type<ModalContentComponent> | string;
  buttons: ModalButtons;
  otherParams: ModalParams;
}
