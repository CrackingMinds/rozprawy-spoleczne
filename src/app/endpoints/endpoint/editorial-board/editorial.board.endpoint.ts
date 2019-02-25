import { Observable } from 'rxjs';

import { EditorialBoard } from 'app/models/editorial.board';
import { NewEditorialBoardMember, UpdatedEditorialBoardMember } from 'app/models/editorial-board-member';

export abstract class EditorialBoardEndpoint {

  abstract getEditorialBoard(): Observable<EditorialBoard>;
  abstract postEditorialBoardMember(memberData: NewEditorialBoardMember): Observable<void>;
  abstract deleteEditorialBoardMember(memberId: string): Observable<void>;
  abstract updateEditorialBoardMember(memberData: UpdatedEditorialBoardMember): Observable<void>;

}
