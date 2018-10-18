import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { ArticleType } from 'app/models/article.type';
import { F_ArticleType } from 'app/models/firestore/article.type';

@Component({
  selector: 'rs-select-article-type',
  templateUrl: './select.article.type.component.html'
})
export class SelectArticleTypeComponent implements OnInit {

  @Input()
  parentForm: FormGroup;

  articleTypeControl = new FormControl(undefined, [
    Validators.required
  ]);

  articleTypes: Observable<ArticleType[]>;

  private articleTypesCollection: AngularFirestoreCollection<ArticleType>;

  constructor(private angularFirestore: AngularFirestore) {}

  ngOnInit() {
    this.articleTypesCollection = this.angularFirestore.collection<ArticleType>('article-types');
    this.articleTypes = this.articleTypesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data() as F_ArticleType;
        return {
          id: a.payload.doc.id,
          namePl: data.namePl
        };
      }))
    );

    this.parentForm.addControl('articleType', this.articleTypeControl);
  }
}
