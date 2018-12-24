import { NgModule, ModuleWithProviders } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDpzaK27gxywB2GmUqbARaTr8JVvtFikk8',
  authDomain: 'rozprawy-spoleczne-ea7db.firebaseapp.com',
  databaseURL: 'https://rozprawy-spoleczne-ea7db.firebaseio.com',
  projectId: 'rozprawy-spoleczne-ea7db',
  storageBucket: 'rozprawy-spoleczne-ea7db.appspot.com',
  messagingSenderId: '192586844505'
};

const providers = [
];

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: providers
})
export class FirebaseConfigModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FirebaseConfigModule,
      providers: providers
    };
  }

}
