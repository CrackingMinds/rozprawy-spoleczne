import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore, QueryFn } from 'angularfire2/firestore';

export abstract class FirestoreEndpoint<T> {

  protected constructor(protected readonly angularFirestore: AngularFirestore) {}

  getDocument(id: string): AngularFirestoreDocument<T> {
    return this.angularFirestore.doc(`${this.getCollectionName()}/${id}`);
  }

  getCollection(queryFn?: QueryFn): AngularFirestoreCollection<T> {
    return this.angularFirestore.collection<T>(this.getCollectionName(), queryFn);
  }

  protected abstract getCollectionName(): string;

}
