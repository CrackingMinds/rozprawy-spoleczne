import { Observable } from 'rxjs';

import { Issue, RawIssue } from 'app/models/issue';
import { ArticleEntity } from 'app/models/article';
import { ArticleCrudParams } from 'app/admin/pages/library/crud/article-crud/article.crud.params';

export type ModalParams = undefined | Issue | ArticleCrudParams;
export type ModalReturnData = void | boolean | Issue | RawIssue | ArticleEntity;

export interface ModalContentComponent {

  params: ModalParams;

  submit(): ModalReturnData;
  cancel(): ModalReturnData;

  canSubmit(): Observable<boolean>;

}
