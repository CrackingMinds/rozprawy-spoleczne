import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AngularFirestore } from 'angularfire2/firestore';

import { OrderedFirestoreEndpoint } from 'app/endpoints/firestore-endpoint/ordered.firestore.endpoint';

import { OrderChanges } from 'app/shared/order-utils/change/order.change';

import { EditorialBoardEndpoint } from 'app/endpoints/endpoint/editorial-board/editorial.board.endpoint';

import { EditorialBoard } from 'app/models/editorial.board';
import { EditorialBoardMemberEntity, NewEditorialBoardMember, UpdatedEditorialBoardMember } from 'app/models/editorial-board-member';

@Injectable()
export class FirestoreEditorialBoardEndpoint extends OrderedFirestoreEndpoint<EditorialBoardMemberEntity> implements EditorialBoardEndpoint {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  getEditorialBoard(): Observable<EditorialBoard> {
    return this.fetchData();
  }

  postEditorialBoardMember(rawMemberData: NewEditorialBoardMember): Observable<void> {
    return this.addDocument(rawMemberData);
  }

  updateEditorialBoardMember(memberData: UpdatedEditorialBoardMember): Observable<void> {
    return this.updateDocument(memberData.id, {
      person: memberData.person,
      position: memberData.position
    });
  }

  deleteEditorialBoardMember(memberId: string, orderChanges: OrderChanges): Observable<void> {
    return this.deleteOrderedItem(memberId, orderChanges);
  }

  protected getCollectionName(): string {
    return "editorial-board";
  }

}
