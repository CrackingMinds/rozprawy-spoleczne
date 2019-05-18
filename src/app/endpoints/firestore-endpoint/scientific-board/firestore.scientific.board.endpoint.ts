import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { FirestoreEndpoint } from 'app/endpoints/firestore-endpoint/firestore.endpoint';

import { ScientificBoardEndpoint } from 'app/endpoints/endpoint/scientific-board/scientific.board.endpoint';

import { ScientificBoard } from 'app/models/scientific.board';
import {
  NewScientificBoardMember,
  ScientificBoardMemberEntity,
  UpdatedScientificBoardMember
} from 'app/models/scientific-board-member';

@Injectable()
export class FirestoreScientificBoardEndpoint extends FirestoreEndpoint<ScientificBoardMemberEntity> implements ScientificBoardEndpoint {

  constructor(angularFirestore: AngularFirestore) { super(angularFirestore); }

  deleteScientificBoardMember(memberId: string): Observable<void> {
    return from(this.getDocument(memberId).delete());
  }

  getScientificBoard(): Observable<ScientificBoard> {
    return this.getCollection().snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as ScientificBoardMemberEntity;
          return {
            id: a.payload.doc.id,
            ...data
          };
        })),
        take(1)
      );
  }

  postScientificBoardMember(rawMemberData: NewScientificBoardMember): Observable<void> {
    return from(this.getCollection().add(rawMemberData))
      .pipe(map(() => null));
  }

  updateScientificBoardMember(memberData: UpdatedScientificBoardMember): Observable<void> {
    const persistedScientificBoardMember: ScientificBoardMemberEntity = {
      person: memberData.person,
      institute: memberData.institute,
      index: memberData.index
    };
    return from(this.getDocument(memberData.id).update(persistedScientificBoardMember));
  }

  protected getCollectionName(): string {
    return 'scientific-board';
  }

}
