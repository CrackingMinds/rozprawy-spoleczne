import { Component, OnInit, Optional, Self, HostBinding, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

import { MatSelectChange, MatFormFieldControl } from '@angular/material';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';

import { IArticleType } from 'app/models/article.type';
import { F_IArticleType } from 'app/models/firestore/article.type.f';

@Component({
  selector: 'rs-select-article-type',
  templateUrl: './select.article.type.component.html',
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: SelectArticleTypeComponent
    }
  ]
})
export class SelectArticleTypeComponent implements ControlValueAccessor, MatFormFieldControl<string>, OnInit, OnDestroy {

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this._stateChange$.next();
  }

  @Input()
  get required() { return this._required; }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this._stateChange$.next();
  }

  @Input()
  get disabled() { return this._disabled; }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this._stateChange$.next();
  }

  static nextId = 0;

  @HostBinding()
  id = `rs-select-article-type-${SelectArticleTypeComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat() { return this.focused || !this.empty; }

  get empty(): boolean { return !this.selectedType; }

  articleTypes: Observable<IArticleType[]>;

  stateChanges: Observable<void>;

  value: string;

  errorState: boolean;

  focused: boolean;

  private _stateChange$ = new Subject<void>();
  private _required: boolean;
  private _disabled: boolean;
  private _placeholder: string;

  private touched: boolean;

  private onChange: (articleType: IArticleType) => any;
  private onTouched: () => any;

  private selectedType: IArticleType;

  constructor(private angularFirestore: AngularFirestore,
              @Optional() @Self() public ngControl: NgControl) {

    if (this.ngControl != null) { this.ngControl.valueAccessor = this; }

  }

  ngOnInit() {
    let articleTypesCollection = this.angularFirestore.collection<IArticleType>('article-types');
    this.articleTypes = articleTypesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        let data = a.payload.doc.data() as IArticleType;
        return {
          id: a.payload.doc.id,
          namePl: data.namePl
        };
      }))
    );

    this.stateChanges = this._stateChange$.asObservable();
  }

  ngOnDestroy() {
    this._stateChange$.complete();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(articleTypeId: string): void {
  }

  onContainerClick(event: MouseEvent): void {
  }

  setDescribedByIds(ids: string[]) {
  }

  protected onFocus(): void {
    this.focused = true;
    this._stateChange$.next();
  }

  protected onBlur(): void {
    this.focused = false;
    this._stateChange$.next();
  }

  protected onOpenedChange(): void {

    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }

    this.errorState = !this.ngControl.valid;
    this._stateChange$.next();
  }

  protected onSelectionChange(change: MatSelectChange): void {
    this.selectedType = change.value as IArticleType;
    if (this.onChange) {
      this.onChange(this.selectedType);
    }
  }
}
