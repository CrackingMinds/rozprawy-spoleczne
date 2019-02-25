import { Observable } from 'rxjs';

import { ScientificBoard } from 'app/models/scientific.board';
import { NewScientificBoardMember, UpdatedScientificBoardMember } from 'app/models/scientific-board-member';

export abstract class ScientificBoardEndpoint {

  abstract getScientificBoard(): Observable<ScientificBoard>;
  abstract postScientificBoardMember(rawMemberData: NewScientificBoardMember): Observable<void>;
  abstract deleteScientificBoardMember(memberId: string): Observable<void>;
  abstract updateScientificBoardMember(memberData: UpdatedScientificBoardMember): Observable<void>;

}
