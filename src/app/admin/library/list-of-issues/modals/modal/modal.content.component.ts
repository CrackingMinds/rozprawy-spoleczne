import { IIssue, IRawIssue } from 'app/models/issue';
import { IArticle } from 'app/models/article';

export type ModalParams = undefined | IIssue;
export type ModalReturnData = void | boolean | IIssue | IRawIssue | IArticle;

export interface ModalContentComponent {

  canSubmit: boolean;
  params: ModalParams;

  submit(): ModalReturnData;
  cancel(): ModalReturnData;
}
