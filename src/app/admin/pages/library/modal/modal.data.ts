import { Type } from '@angular/core';

import { ModalContent } from 'app/admin/pages/library/modal/content/modal.content';
import { ModalButtons } from 'app/admin/pages/library/modal/modal.buttons';

export interface ModalData<I> {
  title: string | null;
  content: Type<ModalContent<I, any>> | string;
  buttons: ModalButtons;
  otherParams: I;
}
