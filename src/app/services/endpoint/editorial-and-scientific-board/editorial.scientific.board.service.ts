import { Observable } from 'rxjs';

import { EditorialBoardMember } from 'app/models/editorial-board-member';
import { ScientificBoardMember } from 'app/models/scientific-board-member';

export abstract class EditorialScientificBoardService {

    abstract fetchEditorialBoardMembers(): Observable<EditorialBoardMember[]>;

    abstract fetchScientificBoardMembers(): Observable<ScientificBoardMember[]>;

}
