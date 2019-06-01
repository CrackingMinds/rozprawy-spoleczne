import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore, QueryFn, QueryDocumentSnapshot } from 'angularfire2/firestore';

export abstract class FirestoreEndpoint<T> {

  protected constructor(protected readonly angularFirestore: AngularFirestore) {}

  fetchData(queryFn?: QueryFn): Observable<Array<T & { id: string }>> {
    return this.getCollection(queryFn)
               .snapshotChanges()
               .pipe(
                 map(actions => {
                   if (!actions.length)
                     return null;

                   return actions.map(a => {
                     const doc: QueryDocumentSnapshot<T> = a.payload.doc;
                     return Object.assign({ id: doc.id }, doc.data());
                   });
                 }),
                 take(1)
               );
  }

  fetchOne(docId: string): Observable<T & { id: string }> {
    return this.getDocument(docId)
               .snapshotChanges()
               .pipe(
                 map(action => {
                   const payload = action.payload;
                   return Object.assign({ id: payload.id }, payload.data());
                 }),
                 take(1)
               );
  }

  addDocument(document: T): Observable<void> {
    return from(this.getCollection().add(document))
      .pipe(map(() => null));
  }

  updateDocument(docId: string, data: Partial<T>): Observable<void> {
    return from(this.getDocument(docId).update(data));
  }

  deleteDocument(docId: string): Observable<void> {
    return from(this.getDocument(docId).delete());
  }

  getDocument(id: string): AngularFirestoreDocument<T> {
    return this.angularFirestore.doc(`${this.getCollectionName()}/${id}`);
  }

  getCollection(queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return this.angularFirestore.collection<T>(this.getCollectionName(), queryFn);
  }

  protected abstract getCollectionName(): string;

}
