import { ModalParams } from 'app/admin/library/list-of-issues/modals/modal/modal.params';

export interface ModalContentComponent {

  canSubmit: boolean;
  params: ModalParams;

  submit(): Promise<void>;
  cancel(): Promise<void>;
}
