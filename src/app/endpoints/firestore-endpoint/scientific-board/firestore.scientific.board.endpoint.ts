import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';

import { OrderedFirestoreEndpoint } from 'app/endpoints/firestore-endpoint/ordered.firestore.endpoint';

import { OrderChanges } from 'app/shared/order-utils/change/order.change';

import { ScientificBoardEndpoint } from 'app/endpoints/endpoint/scientific-board/scientific.board.endpoint';

import { ScientificBoard } from 'app/models/scientific.board';
import { NewScientificBoardMember, ScientificBoardMemberEntity, UpdatedScientificBoardMember } from 'app/models/scientific-board-member';

@Injectable()
export class FirestoreScientificBoardEndpoint extends OrderedFirestoreEndpoint<ScientificBoardMemberEntity> implements ScientificBoardEndpoint {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  getScientificBoard(): Observable<ScientificBoard> {
    return this.fetchData();
  }

  postScientificBoardMember(rawMemberData: NewScientificBoardMember): Observable<void> {
    return this.addDocument(rawMemberData);
  }

  updateScientificBoardMember(memberData: UpdatedScientificBoardMember): Observable<void> {
    return this.updateDocument(memberData.id, {
      person: memberData.person,
      institute: memberData.institute
    });
  }

  deleteScientificBoardMember(memberId: string, orderChanges: OrderChanges): Observable<void> {
    return this.deleteOrderedItem(memberId, orderChanges);
  }

  protected getCollectionName(): string {
    return 'scientific-board';
  }

}
