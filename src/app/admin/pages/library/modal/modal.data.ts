import { Type } from '@angular/core';

import { ModalContentComponent, ModalParams } from 'app/admin/pages/library/modal/modal.content.component';
import { ModalButtons } from 'app/admin/pages/library/modal/modal.buttons';

export interface ModalData {
  title: string | null;
  content: Type<ModalContentComponent> | string;
  buttons: ModalButtons;
  otherParams: ModalParams;
}
