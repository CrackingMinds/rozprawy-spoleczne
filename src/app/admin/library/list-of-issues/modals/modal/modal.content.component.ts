import { IIssue, IRawIssue } from 'app/models/issue';
import { RawArticleWithTypeId } from 'app/models/article';

export type ModalParams = undefined | IIssue;
export type ModalReturnData = void | boolean | IIssue | IRawIssue | RawArticleWithTypeId;

export interface ModalContentComponent {

  canSubmit: boolean;
  params: ModalParams;

  submit(): ModalReturnData;
  cancel(): ModalReturnData;
}
