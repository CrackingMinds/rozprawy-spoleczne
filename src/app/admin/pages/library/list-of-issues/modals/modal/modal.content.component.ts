import { Issue, RawIssue } from 'app/models/issue';
import { RawArticle } from 'app/models/article';

export type ModalParams = undefined | Issue;
export type ModalReturnData = void | boolean | Issue | RawIssue | RawArticle;

export interface ModalContentComponent {

  canSubmit: boolean;
  params: ModalParams;

  submit(): ModalReturnData;
  cancel(): ModalReturnData;
}
