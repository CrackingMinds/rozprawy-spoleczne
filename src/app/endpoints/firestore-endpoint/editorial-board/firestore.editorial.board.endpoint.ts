import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';

import { EditorialBoardEndpoint } from 'app/endpoints/endpoint/editorial-board/editorial.board.endpoint';

import { EditorialBoard } from 'app/models/editorial.board';
import { EditorialBoardMemberEntity, NewEditorialBoardMember, UpdatedEditorialBoardMember } from 'app/models/editorial-board-member';

@Injectable()
export class FirestoreEditorialBoardEndpoint extends FirestoreEndpoint<EditorialBoardMemberEntity> implements EditorialBoardEndpoint {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  deleteEditorialBoardMember(memberId: string): Observable<void> {
    return from(this.getDocument(memberId).delete());
  }

  getEditorialBoard(): Observable<EditorialBoard> {
    return this.getCollection().snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as EditorialBoardMemberEntity;
          return {
            id: a.payload.doc.id,
            ...data
          };
        })),
        take(1)
      );
  }

  postEditorialBoardMember(rawMemberData: NewEditorialBoardMember): Observable<void> {
    return from(this.getCollection().add(rawMemberData))
      .pipe(map(() => null));
  }

  updateEditorialBoardMember(memberData: UpdatedEditorialBoardMember): Observable<void> {
    const persistedEditorialBoardMember: EditorialBoardMemberEntity = {
      person: memberData.person,
      position: memberData.position,
      index: memberData.index
    };
    return from(this.getDocument(memberData.id).update(persistedEditorialBoardMember));
  }

  protected getCollectionName(): string {
    return "editorial-board";
  }

}
