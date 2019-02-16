import { Observable } from 'rxjs';

import { EditorialBoard } from 'app/models/editorial.board';
import { EditorialBoardMember, RawEditorialBoardMember } from 'app/models/editorial-board-member';

export abstract class EditorialBoardEndpoint {

  abstract getEditorialBoard(): Observable<EditorialBoard>;
  abstract postEditorialBoardMember(memberData: RawEditorialBoardMember): Observable<void>;
  abstract deleteEditorialBoardMember(memberId: string): Observable<void>;
  abstract updateEditorialBoardMember(memberData: EditorialBoardMember): Observable<void>;

}
