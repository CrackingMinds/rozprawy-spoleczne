import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { MatSelectChange } from '@angular/material';

import { ArticleType } from 'app/models/article.type';
import { F_ArticleType } from 'app/models/firestore/article.type';

@Component({
  selector: 'rs-select-article-type',
  templateUrl: './select.article.type.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectArticleTypeComponent,
    multi: true
  }]
})
export class SelectArticleTypeComponent implements ControlValueAccessor, OnInit {

  private onChangeCallback;

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
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }

  onSelectionChange(change: MatSelectChange): void {
    if (this.onChangeCallback) {
      this.onChangeCallback(change.value as ArticleType);
    }
  }
}
