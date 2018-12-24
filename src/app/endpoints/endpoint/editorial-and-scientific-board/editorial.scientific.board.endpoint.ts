import { Observable } from 'rxjs';

import { EditorialBoardMember } from 'app/models/editorial-board-member';
import { ScientificBoardMember } from 'app/models/scientific-board-member';

export abstract class EditorialScientificBoardEndpoint {

  abstract getEditorialBoardMembers(): Observable<EditorialBoardMember[]>;
  abstract getScientificBoardMembers(): Observable<ScientificBoardMember[]>;

}
