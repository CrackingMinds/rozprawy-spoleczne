import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore, QueryFn, QueryDocumentSnapshot } from 'angularfire2/firestore';

export abstract class FirestoreEndpoint<T> {

  protected constructor(protected readonly angularFirestore: AngularFirestore) {}

  fetchData(): Observable<Array<T & { id: string }>> {
    return this.getCollection().snapshotChanges()
               .pipe(
                 map(actions => actions.map(a => {
                   const doc: QueryDocumentSnapshot<T> = a.payload.doc;
                   return Object.assign({ id: doc.id }, doc.data());
                 }))
               );
  }

  addDocument(document: T): Observable<void> {
    return from(this.getCollection().add(document))
      .pipe(map(() => null));
  }

  updateDocument(docId: string, data: Partial<T>): Observable<void> {
    return from(this.getDocument(docId).update(data));
  }

  getDocument(id: string): AngularFirestoreDocument<T> {
    return this.angularFirestore.doc(`${this.getCollectionName()}/${id}`);
  }

  getCollection(queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return this.angularFirestore.collection<T>(this.getCollectionName(), queryFn);
  }

  protected abstract getCollectionName(): string;

}
