import { Injectable } from '@angular/core';

import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

import { ScientificBoardEndpoint } from 'app/endpoints/endpoint/scientific-board/scientific.board.endpoint';

import { ScientificBoard } from 'app/models/scientific.board';
import {
  NewScientificBoardMember,
  ScientificBoardMemberEntity,
  UpdatedScientificBoardMember
} from 'app/models/scientific-board-member';

@Injectable()
export class FirestoreScientificBoardEndpoint extends ScientificBoardEndpoint {

  private static readonly collectionName: string = 'scientific-board';

  constructor(private angularFirestore: AngularFirestore) { super(); }

  deleteScientificBoardMember(memberId: string): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      const scientificBoardMemberDocToBeDeleted: AngularFirestoreDocument<ScientificBoardMemberEntity> = this.angularFirestore.doc(`${FirestoreScientificBoardEndpoint.collectionName}/${memberId}`);
      scientificBoardMemberDocToBeDeleted.delete()
        .then(() => {
          observer.next(null);
          observer.complete();
        })
        .catch(reason => observer.error(reason));
    });

  }

  getScientificBoard(): Observable<ScientificBoard> {

    const scientificBoardCollection = this.angularFirestore.collection<ScientificBoardMemberEntity>(FirestoreScientificBoardEndpoint.collectionName);
    return scientificBoardCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as ScientificBoardMemberEntity;
          return {
            id: a.payload.doc.id,
            ...data
          };
        }))
      );

  }

  postScientificBoardMember(rawMemberData: NewScientificBoardMember): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      this.angularFirestore.collection<ScientificBoardMemberEntity>(FirestoreScientificBoardEndpoint.collectionName).add(rawMemberData)
        .then(() => {
          observer.next(null);
          observer.complete();
        })
        .catch((reason) => observer.error(reason));
    });

  }

  updateScientificBoardMember(memberData: UpdatedScientificBoardMember): Observable<void> {

    const persistedScientificBoardMember: ScientificBoardMemberEntity = {
      person: memberData.person,
      institute: memberData.institute,
      index: memberData.index
    };

    return Observable.create((observer: Observer<void>) => {
      const scientificBoardMemberDocToBeUpdated: AngularFirestoreDocument<ScientificBoardMemberEntity> = this.angularFirestore.doc(`${FirestoreScientificBoardEndpoint.collectionName}/${memberData.id}`);
      scientificBoardMemberDocToBeUpdated.update(persistedScientificBoardMember)
        .then(() => {
          observer.next(null);
          observer.complete();
        })
        .catch(reason => observer.error(reason));
    });

  }

}
