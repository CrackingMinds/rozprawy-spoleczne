import { Injectable } from '@angular/core';

import { Observable, of, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { EditorialBoardEndpoint } from 'app/endpoints/endpoint/editorial-board/editorial.board.endpoint';

import { EditorialBoard } from 'app/models/editorial.board';
import { EditorialBoardMember, EditorialBoardMemberEntity, RawEditorialBoardMember } from 'app/models/editorial-board-member';

@Injectable()
export class FirestoreEditorialBoardEndpoint extends EditorialBoardEndpoint {

  private static collectionName: string = 'editorial-board';

  constructor(private angularFirestore: AngularFirestore) { super(); }

  deleteEditorialBoardMember(memberId: string): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      const editorialBoardMemberDocToBeDeleted: AngularFirestoreDocument<EditorialBoardMemberEntity> = this.angularFirestore.doc(`${FirestoreEditorialBoardEndpoint.collectionName}/${memberId}`);
      editorialBoardMemberDocToBeDeleted.delete()
        .then(() => {
          observer.next(null);
          observer.complete();
        })
        .catch(reason => observer.error(reason));
    });

  }

  getEditorialBoard(): Observable<EditorialBoard> {

    const editorialBoardCollection = this.angularFirestore.collection<EditorialBoardMemberEntity>(FirestoreEditorialBoardEndpoint.collectionName);
    return editorialBoardCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as EditorialBoardMemberEntity;
          return {
            id: a.payload.doc.id,
            ...data
          };
        }))
      );

  }

  postEditorialBoardMember(rawMemberData: RawEditorialBoardMember): Observable<void> {

    return Observable.create((observer: Observer<void>) => {
      this.angularFirestore.collection<EditorialBoardMemberEntity>(FirestoreEditorialBoardEndpoint.collectionName).add(rawMemberData)
        .then(() => {
          observer.next(null);
          observer.complete();
        })
        .catch((reason) => observer.error(reason));
    });

  }

  updateEditorialBoardMember(memberData: EditorialBoardMember): Observable<void> {

    const persistedEditorialBoardMember: EditorialBoardMemberEntity = {
      person: memberData.person,
      position: memberData.position,
      index: memberData.index
    };

    return Observable.create((observer: Observer<void>) => {
      const editorialBoardMemberDocToBeUpdated: AngularFirestoreDocument<EditorialBoardMemberEntity> = this.angularFirestore.doc(`${FirestoreEditorialBoardEndpoint.collectionName}/${memberData.id}`);
      editorialBoardMemberDocToBeUpdated.update(persistedEditorialBoardMember)
        .then(() => {
          observer.next(null);
          observer.complete();
        })
        .catch(reason => observer.error(reason));
    });

  }

}
