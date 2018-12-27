import { Observable } from 'rxjs';

import { Issue, RawIssue } from 'app/models/issue';
import { ArticleEntity } from 'app/models/article';

export type ModalParams = undefined | Issue;
export type ModalReturnData = void | boolean | Issue | RawIssue | ArticleEntity;

export interface ModalContentComponent {

  params: ModalParams;

  submit(): ModalReturnData;
  cancel(): ModalReturnData;

  canSubmit(): Observable<boolean>;

}
