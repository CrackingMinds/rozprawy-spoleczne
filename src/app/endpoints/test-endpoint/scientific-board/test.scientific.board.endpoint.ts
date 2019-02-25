import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ScientificBoardEndpoint } from 'app/endpoints/endpoint/scientific-board/scientific.board.endpoint';
import { ScientificBoard } from 'app/models/scientific.board';
import { RawScientificBoardMember, ScientificBoardMember } from 'app/models/scientific-board-member';

@Injectable()
export class TestScientificBoardEndpoint extends ScientificBoardEndpoint {

  deleteScientificBoardMember(memberId: string): Observable<void> {
    console.log('delete (id): ', memberId);
    return of(null);
  }

  getScientificBoard(): Observable<ScientificBoard> {
    return of([]);
  }

  postScientificBoardMember(memberData: RawScientificBoardMember): Observable<void> {
    console.log('post member: ', memberData);
    return of(null);
  }

  updateScientificBoardMember(memberData: ScientificBoardMember): Observable<void> {
    console.log('update member: ', memberData);
    return of(null);
  }

}
